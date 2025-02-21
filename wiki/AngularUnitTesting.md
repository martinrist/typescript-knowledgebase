# Unit Testing Angular Apps

<!-- TOC -->
* [Unit Testing Angular Apps](#unit-testing-angular-apps)
  * [Jasmine Unit Testing Basics](#jasmine-unit-testing-basics)
  * [Angular-specific Testing Utilities](#angular-specific-testing-utilities)
  * [Testing Components](#testing-components)
    * [Component Setup and Testing](#component-setup-and-testing)
    * [Testing Components with Dependencies](#testing-components-with-dependencies)
      * [Stubbing Dependencies](#stubbing-dependencies)
      * [Spying on Dependencies](#spying-on-dependencies)
    * [Testing Components with Asynchronous Services](#testing-components-with-asynchronous-services)
    * [Testing with Inputs and Outputs](#testing-with-inputs-and-outputs)
  * [Testing Services](#testing-services)
    * [Testing Synchronous Service Methods](#testing-synchronous-service-methods)
    * [Testing Asynchronous Service Methods](#testing-asynchronous-service-methods)
    * [Testing Services with Dependencies](#testing-services-with-dependencies)
  * [Testing Pipes](#testing-pipes)
  * [Testing Directives](#testing-directives)
<!-- TOC -->

## Jasmine Unit Testing Basics

- Angular uses Jasmine for unit testing, which uses the `describe` and `it`
  functions to run a test:
    - `describe` defines a test suite and accepts a name and arrow function.
      The arrow function is the body of the test suite.
    - `it` defines a single unit test, which also accepts a name and an
      arrow function defining the tests.

- Each test suite can contain multiple tests, and can also contain setup and
  teardown logic in the `beforeEach()` and `afterEach` methods.

- Example test suite:

    ```typescript
    describe('Calculator', () => {
      let total: number;

      // Setup method
      beforeEach(() => total = 1);

      // Unit test
      it('should add two numbers', () => {
        total = total + 1;
        expect(total).toBe(2);
      });

      // Another unit test
      it('should subtract two numbers', () => {
        total = total - 1;
        expect(total).toBe(0);
      });

      // Teardown method
      afterEach(() => total = 0);
    });
    ```

## Angular-specific Testing Utilities

- Angular contains a number of support utilities and helper methods that
  assist in setting up unit tests and writing assertions in the context of
  an Angular app.

- Core support is provided by the `TestBed` class, which creates a testing
  module that behaves like an ordinary Angular module.
    - When we test an Angular artifact, we detach it from the module it
      normally resides in and attach it to the testing module using the
      `TestBed.configureTestingModule()` method.

- `ComponentFixture` is a wrapper class around an Angular component instance,
  which allows us to interact with the component and its corresponding HTML
  element.

- `DebugElement` is a wrapper around the DOM element of the component.


## Testing Components

### Component Setup and Testing

- The setup step for an Angular component configures the testing module with
  the component (`AppComponent` shown for example):

    ```typescript
    describe('AppComponent', () => {
      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [ AppComponent ],
        }).compileComponents();
      });
    });
    ```

- An initial unit test verifies that the component test is created
  successfully, by creating the `ComponentFixture` instance:

    ```typescript
    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();

      // we can also access the public API of the cmoponent
      expect(app.title).toEqual('my-app');
    });
    ```

- As well as testing the component class, we can test the rendered template:

    ```typescript
    it('should render title', () => {
      const fixture = TestBed.createComponent(AppComponent);

      // `detectChanges()` triggers Angular's change detection mechanism,
      // forcing the data bindings to be updated and executes `ngOnInit()`
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.content span')?.textContent)
        .toContain('my-app app is running!');
    });
    ```


### Testing Components with Dependencies

- There are two main different ways to test components (or services) that
  have dependencies:
    - _Stubbing_ - telling the injector to inject a stub of the dependency
      that provides fixed responses instead of the real thing.
    - _Spying_ - injecting the actual dependency but attaching a _spy_ to
      the method we want to call.  The spy can return mock data or let the
      method call through.  We can also assert on the the methods called.


#### Stubbing Dependencies

- Replacing a dependency with a _stub_ involves completely replacing the
  dependency with a fake version, created either by:
    - Creating a constant variable that contains properties and methods of
      the real dependency.
    - Creating a mock definition of the actual class of the dependency.

- Consider the following `StubComponent` which depends on `StubService`:

    ```typescript
    @Injectable({ providedIn: 'root' })
    export class StubService {
        name = '';
        isBusy = false;
    }

    @Component({
      selector: 'app-stub',
      template: '<span>{{msg}}<span>'
    })
    export class StubComponent implements OnInit {
      msg = '';
      constructor(private stub: StubService) { }
      ngOnInit() {
        this.msg = !this.stub.isBusy
          ? this.stub.name + ' is available'
          : this.stub.name + ' is on a mission';
      }
    }
    ```

- To create a stub for `StubService`, create a constant variable of type
  `Partial<StubService>` (so that some properties can be optional) and just
  override the ones used by the test.  This can then be injected into the
  component using the `providers` property on `TestBed.configureTestingModule()`:

    ```typescript
    const serviceStub: Partial<StubService> = { name: 'Boothstomper' };

    await TestBed.configureTestingModule({
     declarations: [ StubComponent ],
     providers: [{ provide: StubService, useValue: serviceStub }]
    });
    ```

- In the setup step, we need to get a reference to the service so that we can
  set it up with various test values.  This can be done by calling `TestBed.
  inject(StubService)`:

    ```typescript
    describe('StubComponent', () => {
      let component: StubComponent;
      let fixture: ComponentFixture<StubComponent>;
      let msgDisplay: HTMLElement;
      let service: StubService;
      const serviceStub: Partial<StubService> = { name: 'Boothstomper' };

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [ StubComponent ],
          providers: [{ provide: StubService, useValue: serviceStub }]
        });

        fixture = TestBed.createComponent(StubComponent);
        component = fixture.componentInstance;

        msgDisplay = fixture.nativeElement.querySelector('span');
        service = TestBed.inject(StubService);
      });
    });
    ```

- Then we can set up separate test cases for various values of `service.isBusy`:

    ```typescript
    describe('status', () => {
      it('should be on a mission', () => {
        service.isBusy = true;
        fixture.detectChanges();
        expect(msgDisplay.textContent).toContain('is on a mission');
      });

      it('should be available', () => {
        service.isBusy = false;
        fixture.detectChanges();
        expect(msgDisplay.textContent).toContain('is available');
      });
    });
    ```

- If the dependency is provided at the component injector level (rather than
  by the root injector), the `overrideComponent()` method can be used on
  `TestBed` to inject the stub service:

    ```typescript
    await TestBed.configureTestingModule({
      declarations: [ StubComponent ],
    })
    .overrideComponent(StubComponent, {
      set: {
        providers: [{ provide: StubService, useValue: serviceStub }]
      }
    });
    ```


#### Spying on Dependencies

- As an alternative to replacing the entire dependency, it's possible to
  just replace the parts the component under test is using.  This can be
  done by assigning a _spy_ to these specific methods.

- The spy can answer with fixed data, but it's also possible to assert on
  how many times the spy was called, and with what arguments.

- Consider the following component, that has a dependency on Angular's `Title`
  service:

    ```typescript
    @Component({
      selector: 'app-spy',
      template: '{{ caption }}'
    })
    export class SpyComponent implements OnInit {
      caption = '';

      // `SpyComponent` depends on `Title`
      constructor(private title: Title) {}

      ngOnInit() {
        this.title.setTitle('My Angular app');
        this.caption = this.title.getTitle();
      }
    }
    ```

- When setting up the testing module, we inject `Title` as normal:

    ```typescript
    await TestBed.configureTestingModule({
        declarations: [ SpyComponent ],
        providers: [Title]
    });
    ```

- Then, to test that `setTitle` is called as expected, we can use Jasmine's
  `spyOn` method:

    ```typescript
    it('should set the title', () => {
      const title = TestBed.inject(Title);
      const spy = spyOn(title, 'setTitle');
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith('My Angular app');
    });
    ```

- The other thing we can do is to test `getTitle()` and return test-specific
  data, to test that `caption` gets updated.  This uses Jasmine's
  `createSpyObj()` method:

    ```typescript
    describe('with spy object', () => {
      let titleSpy: jasmine.SpyObj<Title>;

      // Set up the Spy
      beforeEach(() => {
        titleSpy = jasmine.createSpyObj('Title', ['getTitle', 'setTitle']);
        // Configure the spy to return 'My title' when `getTitle()` is called
        titleSpy.getTitle.and.returnValue('My title');

        TestBed.configureTestingModule({
          declarations: [ SpyComponent ],
          providers: [ { provide: Title, useValue: titleSpy } ]
        });
        fixture = TestBed.createComponent(SpyComponent);
        component = fixture.componentInstance;
      });

      it('should get the title', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('My title');
      });
    });
    ```


### Testing Components with Asynchronous Services

- Angular provides two artifacts to tackle asynchronous testing scenarios:
    - `waitForAsync()` - asynchronous approach to unit test async components,
      used in combination with `ComponentFixture.whenStable()`.
    - `fakeAsync()` - synchronous approach, used in combination with the
      `tick()` function.

- Consider a component that is based on an `AsyncService` that returns an
  `Observable` from one of its methods:

    ```typescript
    @Component({
      selector: 'app-async',
      template: `
        <p *ngFor="let hero of data$ | async">
          {{hero}}
        </p>
      `
    })
    export class AsyncComponent implements OnInit {
      data$: Observable<string[]> | undefined;

      constructor(private asyncService: AsyncService) { }

      ngOnInit() {
        this.data$ = this.asyncService.getData();
      }
    }

    // `getData()` returns an Observable with a built-in delay
    export class AsyncService {
      getData(): Observable<string[]> {
        return of(heroes).pipe(delay(500));
      }
    }
    ```

- To test using `waitForAsync()`, wrap the body of the test in
  `waitForAsync()` then use `await fixture.whenStable()` to wait until the
  `data$` observable is complete:

    ```typescript
    it('should get data with waitForAsync', waitForAsync(async() => {
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const heroDisplay: HTMLElement[] = fixture.nativeElement
        .querySelectorAll('p');
      expect(heroDisplay.length).toBe(5);
    }));
    ```

- The alternative, synchronous, approach is to use `fakeAsync()`, then use
  the `tick`) method to manually advance the 'fake' time:

    ```typescript
    it('should get data with fakeAsync', fakeAsync(() => {
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const heroDisplay: HTMLElement[] = fixture.nativeElement
        .querySelectorAll('p');
      expect(heroDisplay.length).toBe(5);
    }));
    ```


### Testing with Inputs and Outputs

- Part of testing a component's public API involves testing how it interacts
  when hosted from another component, including:
    - Verifying that `@Input` bindings are correctly set.
    - Verifying that events emitted to `@Output` bindings trigger correctly
      and that what they emit is received by the host component.


## Testing Services

### Testing Synchronous Service Methods

- Testing a standalone service (one that doesn't depend on other services)
  involves getting an instance from the injector, then calling its public
  properties and methods

    ```typescript
    describe('AsyncService', () => {
      let service: AsyncService;

      beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AsyncService);
      });

      it('should set data', () => {
        const result = service.setData('Fake hero');
        expect(result.length).toBe(6);
      })
    })
    ```


### Testing Asynchronous Service Methods

- Testing service methods that involve observables require us to subscribe
  to the returned observable and inspect the value once the observable is
  complete:

    ```typescript
    it('should get data', (done: DoneFn) => {
      service.getData().subscribe(heroes => {
        expect(heroes.length).toBe(5);
        done();
      });
    });
    ```


### Testing Services with Dependencies

- Testing services with dependencies works in the same way as testing
  components with dependencies - any of the available methods (stubs, spies
  etc) can be used.

- If a service is dependent on `HttpClient`, we can use
  `HttpClientTestingModule` (which replaces the real `HttpClientModule`) and
  the `HttpTestingController` (which mocks the `HttpClient` service):

    ```typescript
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      // Inject (and get a reference to) the service being tested
      service = TestBed.inject(ProductsService);
      // Inject (and get a reference to) the mock HTTP service
      httpTestingController = TestBed.inject(HttpTestingController);
    })
    ```

- Tests can now use methods on our mock `HttpTestingController` to check the
  methods called

    ```typescript
    it('should call the products endpoint', () => {
      service.getProducts().subscribe();
      const req = httpTestingController.expectOne(
        'https://fakestoreapi.com/products');
      expect(req.request.method).toBe('GET');
    });
    ```

- After each test, it's possible to verify that no unmatched requests are
  pending:

    ```typescript
    afterEach(() => {
      httpTestingController.verify();
    });
    ```


## Testing Pipes

- Testing pipes is very straightforward, as it simply requires instantiating
  an instance, calling the `transform()` method and verifying the results:

    ```typescript
    @Pipe({ name: 'list' })
    export class ListPipe implements PipeTransform {
      transform(value: string): string[] {
        return value.split(', ');
      }
    }

    describe('ListPipe', () => {
      it('should return an array', () => {
        const pipe = new ListPipe();
        expect(pipe.transform('A,B,C')).toEqual(['A', 'B', 'C']);
      })
    });
    ```


## Testing Directives

- Since directives are components without a view, they can be tested in the
  same way as components.  The key thing is that they need a test host
  component:

    ```typescript
    @Component({ template: '<span appCopyright></span>'})
    class TestHostComponent {}
    ```

- We can then write a unit test that checks whether the `<span>` element
  contains the `copyright` class and displays the current year:

    ```typescript
    describe('CopyrightDirective', () => {
      let container: HTMLElement;
      beforeEach(() => {
        const fixture = TestBed.configureTestingModule({
          declarations: [CopyrightDirective, TestHostComponent]
        }).createComponent(TestHostComponent);

        container = fixture.nativeElement.querySelector('span');
      });

      it('should have copyright class', () => {
          expect(container.classList).toContain('copyright');
      });

      it('should display copyright details', () => {
          expect(container.textContent).toContain(
            new Date().getFullYear().toString());
      });
    });
    ```


<!-- References -->
