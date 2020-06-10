import { scheduleRoot } from "./schedule";


function render(element, container) {
  let rootFiber = {
    tag: 'Tag_Root',
    stateNode: container,
    props: {children: [element]}
  }

  scheduleRoot(rootFiber)
}