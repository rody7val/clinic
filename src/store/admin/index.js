//import state from './state'
//import * as getters from './getters'
import * as mutations from './mutations'
//import * as actions from './actions'

export default {
  firestorePath: 'admin',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'admin',
  statePropName: 'data',
  namespaced: true,
  sync: {
    preventInitialDocInsertion: true,
  },
  //_
//  state,
//  getters,
  mutations,
//  actions,
}
