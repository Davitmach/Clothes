
import { CreateStore } from "./Store"
import { reducer } from "./Reduce"


export var Store = CreateStore(reducer)


window.Store = Store