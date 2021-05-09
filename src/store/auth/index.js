import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default {
//  firestorePath: 'auth',
//  firestoreRefType: 'collection', // or 'doc'
//  moduleName: 'auth',
//  statePropName: 'data',
  namespaced: true,
  //_
  state,
  getters,
  mutations,
  actions,
}
