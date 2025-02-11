console.log('Chapter 10 - Generics');
console.log('---------------------');

interface Box<T> {
  inside: T;
}

let stringBox: Box<string> = {
  inside: "abc"
};

class Secret<Key, Value> {
  key: Key;
  value: Value;

  constructor(key: Key, value: Value) {
    this.key = key;
    this.value = value;
  }

  getValue(key: Key): Value | undefined {
    return this.key === key ? this.value : undefined;
  }
}

class SuperSecret<Key, Value> extends Secret<Key, Value> {
  getValue(key: Key): Value | undefined {
    return super.getValue(key);
  }
}

type Result<Data> = FailureResult | SuccessfulResult<Data>;

interface FailureResult {
  error: Error;
  succeeded: false;
}

interface SuccessfulResult<Data> {
  data: Data;
  succeeded: true;
}

function handleResult(result: Result<string>) {
  if (result.succeeded) {
    // result: SuccessfulResult<string>
    console.log(`We did it! ${result.data}`);
  } else {
    // result: FailureResult
    console.error(`Awww... ${result.error}`);
  }
}
