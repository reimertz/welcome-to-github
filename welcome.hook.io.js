import sdk from 'hook.io-sdk'

export default function hook(hook) {
  hook.fetchStore = function() {
    return new Promise((resolve, reject) => {
      hook.datastore.get(hook.resource.name)
        .then((externalDataStore) => {
          hook._data = externalDataStore || {}
          resolve(hook._data)
        })
        .catch(reject)
    })
  }

  hook.set = function(key, value) {
    return new Promise((resolve, reject) => {
      let newDataStore = hook._data
          newDataStore[key] = value

      hook.datastore.set(hook.resource.name, newDataStore)
        .then(() => {
          hook._data = newDataStore
          resolve(hook._data)
        })
        .catch(reject)
    })
  }

  function initHook() {
    hook.fetchStore().then(main)
  } initHook()


  function main(dataStore) {
    //Add hook code here
    hook.res.json(hook.req.params)
  }
}
