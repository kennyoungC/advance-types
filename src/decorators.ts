function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY")

  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    const hookEl = document.getElementById(hookId)
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super()
        if (hookEl) {
          hookEl.innerHTML = template
          hookEl.querySelector("h1")!.textContent = this.name
        }
      }
    }
  }
}

// @Logger("logging - person")
@WithTemplate("<h1>my person object", "app")
class Person {
  name = "max"

  constructor() {
    console.log("Creating person object...")
  }
}

const pers = new Person()

console.log(pers)

// --
//PROPERTY DECORATOR
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator!")
  console.log(target, propertyName)
}
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Access Decorator!")
  console.log(target)
  console.log(name)
  console.log(descriptor)
}
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method Decorator!")
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

function Log4(target: string, name: string | Symbol, position: number) {
  console.log("Parameter decorator!")
  console.log(target)
  console.log(name)
  console.log(position)
}

class Product {
  @Log
  title: string
  private _price: number

  constructor(t: string, p: number) {
    this.title = t
    this._price = p
  }
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error("price should be a positive number")
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * 1 + tax
  }

  get price() {
    return this._price
  }
}

const newProd = new Product("phone", 5)
// newProd.price = 14

console.log(newProd.price)

function Autobind(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    },
  }
  return adjDescriptor
}

class Printer {
  message = "This works!"

  @Autobind
  showMessage() {
    console.log(this.message)
  }
}
const p = new Printer()

const button = document.querySelector("button")!
button.addEventListener("click", p.showMessage)

class Course {
  title: string
  price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}
