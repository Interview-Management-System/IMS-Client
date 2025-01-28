export default class UserEndpoint {
    private static readonly USER_CONTROLLER_NAME = 'User'
    public static readonly UserPagingEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/pagination`
    public static readonly DeleteEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/delete`
    public static readonly ActivateEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/activate`
    public static readonly DeActivateEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/de-activate`
    public static readonly DetailEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/detail`
    public static readonly CreateUserEndpoint = `${UserEndpoint.USER_CONTROLLER_NAME}/create`
}
