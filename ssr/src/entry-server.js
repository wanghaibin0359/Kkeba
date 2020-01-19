import {
    createApp
} from './main';

export default context => {
    return new Promise((reslove, reject) => {
        let {
            app,
            router,
            store
        } = createApp(context)
        router.push(context.url)
        router.onReady(() => {
            let matchedComponents = router.getMatchedComponents()
            Promise.all(matchedComponents.map(components => {
                if (components.initData) {
                   return components.initData({
                        store
                    })
                }
            })).then(() => {
                context.state = store.state;
                reslove(app)
            })
        }, reject)
    })
}