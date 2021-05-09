//export function setTitle (state, data) {
//  state.web.title = data
//}
//export function setDesc (state, data) {
//  state.web.desc = data
//}

export function updateMessage (state, {head, id}) {
  state.admin.data[id].web.head = head
}