import { NavigateFunction } from 'react-router-dom'

export default class NavigationHelper {
    private static navigate: NavigateFunction | null = null

    static set setNavigate(navigate: NavigateFunction) {
        this.navigate = navigate
    }

    static goBack() {
        this.navigate?.(-1)
    }

    static goTo(path: string) {
        this.navigate?.(path)
    }
}
