import { NavigateFunction } from 'react-router-dom'

export default class NavigationUtil {
    private static navigator: NavigateFunction | undefined

    static set navigate(navigate: NavigateFunction) {
        NavigationUtil.navigator ??= navigate
    }

    static goTo(path: string) {
        this.navigator?.(path)
    }

    static goBack() {
        this.navigator?.(-1)
    }
}
