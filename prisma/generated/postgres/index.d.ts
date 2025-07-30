
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Server
 * 
 */
export type Server = $Result.DefaultSelection<Prisma.$ServerPayload>
/**
 * Model Member
 * 
 */
export type Member = $Result.DefaultSelection<Prisma.$MemberPayload>
/**
 * Model Channel
 * 
 */
export type Channel = $Result.DefaultSelection<Prisma.$ChannelPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model GroupConversation
 * 
 */
export type GroupConversation = $Result.DefaultSelection<Prisma.$GroupConversationPayload>
/**
 * Model GroupConversationMember
 * 
 */
export type GroupConversationMember = $Result.DefaultSelection<Prisma.$GroupConversationMemberPayload>
/**
 * Model GroupMessage
 * 
 */
export type GroupMessage = $Result.DefaultSelection<Prisma.$GroupMessagePayload>
/**
 * Model FriendRequest
 * 
 */
export type FriendRequest = $Result.DefaultSelection<Prisma.$FriendRequestPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MemberRole: {
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
  GUEST: 'GUEST'
};

export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole]


export const GroupMemberRole: {
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
  GUEST: 'GUEST'
};

export type GroupMemberRole = (typeof GroupMemberRole)[keyof typeof GroupMemberRole]


export const ChannelType: {
  TEXT: 'TEXT',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO'
};

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType]


export const FriendRequestStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export type FriendRequestStatus = (typeof FriendRequestStatus)[keyof typeof FriendRequestStatus]

}

export type MemberRole = $Enums.MemberRole

export const MemberRole: typeof $Enums.MemberRole

export type GroupMemberRole = $Enums.GroupMemberRole

export const GroupMemberRole: typeof $Enums.GroupMemberRole

export type ChannelType = $Enums.ChannelType

export const ChannelType: typeof $Enums.ChannelType

export type FriendRequestStatus = $Enums.FriendRequestStatus

export const FriendRequestStatus: typeof $Enums.FriendRequestStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.server`: Exposes CRUD operations for the **Server** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Servers
    * const servers = await prisma.server.findMany()
    * ```
    */
  get server(): Prisma.ServerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.member`: Exposes CRUD operations for the **Member** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Members
    * const members = await prisma.member.findMany()
    * ```
    */
  get member(): Prisma.MemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.channel`: Exposes CRUD operations for the **Channel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Channels
    * const channels = await prisma.channel.findMany()
    * ```
    */
  get channel(): Prisma.ChannelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupConversation`: Exposes CRUD operations for the **GroupConversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupConversations
    * const groupConversations = await prisma.groupConversation.findMany()
    * ```
    */
  get groupConversation(): Prisma.GroupConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupConversationMember`: Exposes CRUD operations for the **GroupConversationMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupConversationMembers
    * const groupConversationMembers = await prisma.groupConversationMember.findMany()
    * ```
    */
  get groupConversationMember(): Prisma.GroupConversationMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupMessage`: Exposes CRUD operations for the **GroupMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupMessages
    * const groupMessages = await prisma.groupMessage.findMany()
    * ```
    */
  get groupMessage(): Prisma.GroupMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friendRequest`: Exposes CRUD operations for the **FriendRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FriendRequests
    * const friendRequests = await prisma.friendRequest.findMany()
    * ```
    */
  get friendRequest(): Prisma.FriendRequestDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Profile: 'Profile',
    Server: 'Server',
    Member: 'Member',
    Channel: 'Channel',
    Conversation: 'Conversation',
    GroupConversation: 'GroupConversation',
    GroupConversationMember: 'GroupConversationMember',
    GroupMessage: 'GroupMessage',
    FriendRequest: 'FriendRequest'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "profile" | "server" | "member" | "channel" | "conversation" | "groupConversation" | "groupConversationMember" | "groupMessage" | "friendRequest"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Server: {
        payload: Prisma.$ServerPayload<ExtArgs>
        fields: Prisma.ServerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          findFirst: {
            args: Prisma.ServerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          findMany: {
            args: Prisma.ServerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>[]
          }
          create: {
            args: Prisma.ServerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          createMany: {
            args: Prisma.ServerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>[]
          }
          delete: {
            args: Prisma.ServerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          update: {
            args: Prisma.ServerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          deleteMany: {
            args: Prisma.ServerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>[]
          }
          upsert: {
            args: Prisma.ServerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServerPayload>
          }
          aggregate: {
            args: Prisma.ServerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServer>
          }
          groupBy: {
            args: Prisma.ServerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServerCountArgs<ExtArgs>
            result: $Utils.Optional<ServerCountAggregateOutputType> | number
          }
        }
      }
      Member: {
        payload: Prisma.$MemberPayload<ExtArgs>
        fields: Prisma.MemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findFirst: {
            args: Prisma.MemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findMany: {
            args: Prisma.MemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          create: {
            args: Prisma.MemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          createMany: {
            args: Prisma.MemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          delete: {
            args: Prisma.MemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          update: {
            args: Prisma.MemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          deleteMany: {
            args: Prisma.MemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          upsert: {
            args: Prisma.MemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          aggregate: {
            args: Prisma.MemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMember>
          }
          groupBy: {
            args: Prisma.MemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberCountArgs<ExtArgs>
            result: $Utils.Optional<MemberCountAggregateOutputType> | number
          }
        }
      }
      Channel: {
        payload: Prisma.$ChannelPayload<ExtArgs>
        fields: Prisma.ChannelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChannelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChannelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          findFirst: {
            args: Prisma.ChannelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChannelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          findMany: {
            args: Prisma.ChannelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          create: {
            args: Prisma.ChannelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          createMany: {
            args: Prisma.ChannelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChannelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          delete: {
            args: Prisma.ChannelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          update: {
            args: Prisma.ChannelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          deleteMany: {
            args: Prisma.ChannelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChannelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChannelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>[]
          }
          upsert: {
            args: Prisma.ChannelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelPayload>
          }
          aggregate: {
            args: Prisma.ChannelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChannel>
          }
          groupBy: {
            args: Prisma.ChannelGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChannelGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChannelCountArgs<ExtArgs>
            result: $Utils.Optional<ChannelCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      GroupConversation: {
        payload: Prisma.$GroupConversationPayload<ExtArgs>
        fields: Prisma.GroupConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationPayload>
          }
          findFirst: {
            args: Prisma.GroupConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationPayload>
          }
          findMany: {
            args: Prisma.GroupConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationPayload>[]
          }
          create: {
            args: Prisma.GroupConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationPayload>
          }
          createMany: {
            args: Prisma.GroupConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationPayload>[]
          }
          delete: {
            args: Prisma.GroupConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationPayload>
          }
          update: {
            args: Prisma.GroupConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationPayload>
          }
          deleteMany: {
            args: Prisma.GroupConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationPayload>[]
          }
          upsert: {
            args: Prisma.GroupConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationPayload>
          }
          aggregate: {
            args: Prisma.GroupConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupConversation>
          }
          groupBy: {
            args: Prisma.GroupConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupConversationCountArgs<ExtArgs>
            result: $Utils.Optional<GroupConversationCountAggregateOutputType> | number
          }
        }
      }
      GroupConversationMember: {
        payload: Prisma.$GroupConversationMemberPayload<ExtArgs>
        fields: Prisma.GroupConversationMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupConversationMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupConversationMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationMemberPayload>
          }
          findFirst: {
            args: Prisma.GroupConversationMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupConversationMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationMemberPayload>
          }
          findMany: {
            args: Prisma.GroupConversationMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationMemberPayload>[]
          }
          create: {
            args: Prisma.GroupConversationMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationMemberPayload>
          }
          createMany: {
            args: Prisma.GroupConversationMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupConversationMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationMemberPayload>[]
          }
          delete: {
            args: Prisma.GroupConversationMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationMemberPayload>
          }
          update: {
            args: Prisma.GroupConversationMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationMemberPayload>
          }
          deleteMany: {
            args: Prisma.GroupConversationMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupConversationMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupConversationMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationMemberPayload>[]
          }
          upsert: {
            args: Prisma.GroupConversationMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConversationMemberPayload>
          }
          aggregate: {
            args: Prisma.GroupConversationMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupConversationMember>
          }
          groupBy: {
            args: Prisma.GroupConversationMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupConversationMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupConversationMemberCountArgs<ExtArgs>
            result: $Utils.Optional<GroupConversationMemberCountAggregateOutputType> | number
          }
        }
      }
      GroupMessage: {
        payload: Prisma.$GroupMessagePayload<ExtArgs>
        fields: Prisma.GroupMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          findFirst: {
            args: Prisma.GroupMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          findMany: {
            args: Prisma.GroupMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>[]
          }
          create: {
            args: Prisma.GroupMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          createMany: {
            args: Prisma.GroupMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>[]
          }
          delete: {
            args: Prisma.GroupMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          update: {
            args: Prisma.GroupMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          deleteMany: {
            args: Prisma.GroupMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>[]
          }
          upsert: {
            args: Prisma.GroupMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMessagePayload>
          }
          aggregate: {
            args: Prisma.GroupMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupMessage>
          }
          groupBy: {
            args: Prisma.GroupMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupMessageCountArgs<ExtArgs>
            result: $Utils.Optional<GroupMessageCountAggregateOutputType> | number
          }
        }
      }
      FriendRequest: {
        payload: Prisma.$FriendRequestPayload<ExtArgs>
        fields: Prisma.FriendRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          findFirst: {
            args: Prisma.FriendRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          findMany: {
            args: Prisma.FriendRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>[]
          }
          create: {
            args: Prisma.FriendRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          createMany: {
            args: Prisma.FriendRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>[]
          }
          delete: {
            args: Prisma.FriendRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          update: {
            args: Prisma.FriendRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          deleteMany: {
            args: Prisma.FriendRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FriendRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>[]
          }
          upsert: {
            args: Prisma.FriendRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendRequestPayload>
          }
          aggregate: {
            args: Prisma.FriendRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriendRequest>
          }
          groupBy: {
            args: Prisma.FriendRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendRequestCountArgs<ExtArgs>
            result: $Utils.Optional<FriendRequestCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    profile?: ProfileOmit
    server?: ServerOmit
    member?: MemberOmit
    channel?: ChannelOmit
    conversation?: ConversationOmit
    groupConversation?: GroupConversationOmit
    groupConversationMember?: GroupConversationMemberOmit
    groupMessage?: GroupMessageOmit
    friendRequest?: FriendRequestOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    servers: number
    members: number
    channels: number
    conversations: number
    groupConversations: number
    groupConversationsCreated: number
    friendRequestsSent: number
    friendRequestsReceived: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    servers?: boolean | ProfileCountOutputTypeCountServersArgs
    members?: boolean | ProfileCountOutputTypeCountMembersArgs
    channels?: boolean | ProfileCountOutputTypeCountChannelsArgs
    conversations?: boolean | ProfileCountOutputTypeCountConversationsArgs
    groupConversations?: boolean | ProfileCountOutputTypeCountGroupConversationsArgs
    groupConversationsCreated?: boolean | ProfileCountOutputTypeCountGroupConversationsCreatedArgs
    friendRequestsSent?: boolean | ProfileCountOutputTypeCountFriendRequestsSentArgs
    friendRequestsReceived?: boolean | ProfileCountOutputTypeCountFriendRequestsReceivedArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountServersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountChannelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountGroupConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupConversationMemberWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountGroupConversationsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupConversationWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountFriendRequestsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountFriendRequestsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
  }


  /**
   * Count Type ServerCountOutputType
   */

  export type ServerCountOutputType = {
    members: number
    channels: number
  }

  export type ServerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ServerCountOutputTypeCountMembersArgs
    channels?: boolean | ServerCountOutputTypeCountChannelsArgs
  }

  // Custom InputTypes
  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServerCountOutputType
     */
    select?: ServerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
  }

  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeCountChannelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelWhereInput
  }


  /**
   * Count Type MemberCountOutputType
   */

  export type MemberCountOutputType = {
    conversationsInitiated: number
    conversationsReceived: number
    groupConversations: number
    groupMessages: number
  }

  export type MemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversationsInitiated?: boolean | MemberCountOutputTypeCountConversationsInitiatedArgs
    conversationsReceived?: boolean | MemberCountOutputTypeCountConversationsReceivedArgs
    groupConversations?: boolean | MemberCountOutputTypeCountGroupConversationsArgs
    groupMessages?: boolean | MemberCountOutputTypeCountGroupMessagesArgs
  }

  // Custom InputTypes
  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCountOutputType
     */
    select?: MemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountConversationsInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountConversationsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountGroupConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupConversationMemberWhereInput
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountGroupMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMessageWhereInput
  }


  /**
   * Count Type GroupConversationCountOutputType
   */

  export type GroupConversationCountOutputType = {
    members: number
    messages: number
  }

  export type GroupConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | GroupConversationCountOutputTypeCountMembersArgs
    messages?: boolean | GroupConversationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * GroupConversationCountOutputType without action
   */
  export type GroupConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationCountOutputType
     */
    select?: GroupConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupConversationCountOutputType without action
   */
  export type GroupConversationCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupConversationMemberWhereInput
  }

  /**
   * GroupConversationCountOutputType without action
   */
  export type GroupConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    imageUrl: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    imageUrl: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    imageUrl: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    imageUrl?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    imageUrl?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    imageUrl?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    imageUrl?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    servers?: boolean | Profile$serversArgs<ExtArgs>
    members?: boolean | Profile$membersArgs<ExtArgs>
    channels?: boolean | Profile$channelsArgs<ExtArgs>
    conversations?: boolean | Profile$conversationsArgs<ExtArgs>
    groupConversations?: boolean | Profile$groupConversationsArgs<ExtArgs>
    groupConversationsCreated?: boolean | Profile$groupConversationsCreatedArgs<ExtArgs>
    friendRequestsSent?: boolean | Profile$friendRequestsSentArgs<ExtArgs>
    friendRequestsReceived?: boolean | Profile$friendRequestsReceivedArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    imageUrl?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    imageUrl?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    imageUrl?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "imageUrl" | "email" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    servers?: boolean | Profile$serversArgs<ExtArgs>
    members?: boolean | Profile$membersArgs<ExtArgs>
    channels?: boolean | Profile$channelsArgs<ExtArgs>
    conversations?: boolean | Profile$conversationsArgs<ExtArgs>
    groupConversations?: boolean | Profile$groupConversationsArgs<ExtArgs>
    groupConversationsCreated?: boolean | Profile$groupConversationsCreatedArgs<ExtArgs>
    friendRequestsSent?: boolean | Profile$friendRequestsSentArgs<ExtArgs>
    friendRequestsReceived?: boolean | Profile$friendRequestsReceivedArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      servers: Prisma.$ServerPayload<ExtArgs>[]
      members: Prisma.$MemberPayload<ExtArgs>[]
      channels: Prisma.$ChannelPayload<ExtArgs>[]
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
      groupConversations: Prisma.$GroupConversationMemberPayload<ExtArgs>[]
      groupConversationsCreated: Prisma.$GroupConversationPayload<ExtArgs>[]
      friendRequestsSent: Prisma.$FriendRequestPayload<ExtArgs>[]
      friendRequestsReceived: Prisma.$FriendRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      imageUrl: string
      email: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    servers<T extends Profile$serversArgs<ExtArgs> = {}>(args?: Subset<T, Profile$serversArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    members<T extends Profile$membersArgs<ExtArgs> = {}>(args?: Subset<T, Profile$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    channels<T extends Profile$channelsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$channelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversations<T extends Profile$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupConversations<T extends Profile$groupConversationsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$groupConversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupConversationsCreated<T extends Profile$groupConversationsCreatedArgs<ExtArgs> = {}>(args?: Subset<T, Profile$groupConversationsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendRequestsSent<T extends Profile$friendRequestsSentArgs<ExtArgs> = {}>(args?: Subset<T, Profile$friendRequestsSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendRequestsReceived<T extends Profile$friendRequestsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, Profile$friendRequestsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly userId: FieldRef<"Profile", 'String'>
    readonly name: FieldRef<"Profile", 'String'>
    readonly imageUrl: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.servers
   */
  export type Profile$serversArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    where?: ServerWhereInput
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    cursor?: ServerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServerScalarFieldEnum | ServerScalarFieldEnum[]
  }

  /**
   * Profile.members
   */
  export type Profile$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    cursor?: MemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Profile.channels
   */
  export type Profile$channelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    where?: ChannelWhereInput
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    cursor?: ChannelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Profile.conversations
   */
  export type Profile$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Profile.groupConversations
   */
  export type Profile$groupConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    where?: GroupConversationMemberWhereInput
    orderBy?: GroupConversationMemberOrderByWithRelationInput | GroupConversationMemberOrderByWithRelationInput[]
    cursor?: GroupConversationMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupConversationMemberScalarFieldEnum | GroupConversationMemberScalarFieldEnum[]
  }

  /**
   * Profile.groupConversationsCreated
   */
  export type Profile$groupConversationsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationInclude<ExtArgs> | null
    where?: GroupConversationWhereInput
    orderBy?: GroupConversationOrderByWithRelationInput | GroupConversationOrderByWithRelationInput[]
    cursor?: GroupConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupConversationScalarFieldEnum | GroupConversationScalarFieldEnum[]
  }

  /**
   * Profile.friendRequestsSent
   */
  export type Profile$friendRequestsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    cursor?: FriendRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * Profile.friendRequestsReceived
   */
  export type Profile$friendRequestsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    cursor?: FriendRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Server
   */

  export type AggregateServer = {
    _count: ServerCountAggregateOutputType | null
    _min: ServerMinAggregateOutputType | null
    _max: ServerMaxAggregateOutputType | null
  }

  export type ServerMinAggregateOutputType = {
    id: string | null
    name: string | null
    imageUrl: string | null
    inviteCode: string | null
    profileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    imageUrl: string | null
    inviteCode: string | null
    profileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServerCountAggregateOutputType = {
    id: number
    name: number
    imageUrl: number
    inviteCode: number
    profileId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServerMinAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
    inviteCode?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServerMaxAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
    inviteCode?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServerCountAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
    inviteCode?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Server to aggregate.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Servers
    **/
    _count?: true | ServerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServerMaxAggregateInputType
  }

  export type GetServerAggregateType<T extends ServerAggregateArgs> = {
        [P in keyof T & keyof AggregateServer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServer[P]>
      : GetScalarType<T[P], AggregateServer[P]>
  }




  export type ServerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServerWhereInput
    orderBy?: ServerOrderByWithAggregationInput | ServerOrderByWithAggregationInput[]
    by: ServerScalarFieldEnum[] | ServerScalarFieldEnum
    having?: ServerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServerCountAggregateInputType | true
    _min?: ServerMinAggregateInputType
    _max?: ServerMaxAggregateInputType
  }

  export type ServerGroupByOutputType = {
    id: string
    name: string
    imageUrl: string
    inviteCode: string
    profileId: string
    createdAt: Date
    updatedAt: Date
    _count: ServerCountAggregateOutputType | null
    _min: ServerMinAggregateOutputType | null
    _max: ServerMaxAggregateOutputType | null
  }

  type GetServerGroupByPayload<T extends ServerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServerGroupByOutputType[P]>
            : GetScalarType<T[P], ServerGroupByOutputType[P]>
        }
      >
    >


  export type ServerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    inviteCode?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    members?: boolean | Server$membersArgs<ExtArgs>
    channels?: boolean | Server$channelsArgs<ExtArgs>
    _count?: boolean | ServerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["server"]>

  export type ServerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    inviteCode?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["server"]>

  export type ServerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    inviteCode?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["server"]>

  export type ServerSelectScalar = {
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    inviteCode?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "imageUrl" | "inviteCode" | "profileId" | "createdAt" | "updatedAt", ExtArgs["result"]["server"]>
  export type ServerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    members?: boolean | Server$membersArgs<ExtArgs>
    channels?: boolean | Server$channelsArgs<ExtArgs>
    _count?: boolean | ServerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type ServerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $ServerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Server"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      members: Prisma.$MemberPayload<ExtArgs>[]
      channels: Prisma.$ChannelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      imageUrl: string
      inviteCode: string
      profileId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["server"]>
    composites: {}
  }

  type ServerGetPayload<S extends boolean | null | undefined | ServerDefaultArgs> = $Result.GetResult<Prisma.$ServerPayload, S>

  type ServerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServerCountAggregateInputType | true
    }

  export interface ServerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Server'], meta: { name: 'Server' } }
    /**
     * Find zero or one Server that matches the filter.
     * @param {ServerFindUniqueArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServerFindUniqueArgs>(args: SelectSubset<T, ServerFindUniqueArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Server that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServerFindUniqueOrThrowArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServerFindUniqueOrThrowArgs>(args: SelectSubset<T, ServerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Server that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerFindFirstArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServerFindFirstArgs>(args?: SelectSubset<T, ServerFindFirstArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Server that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerFindFirstOrThrowArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServerFindFirstOrThrowArgs>(args?: SelectSubset<T, ServerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Servers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Servers
     * const servers = await prisma.server.findMany()
     * 
     * // Get first 10 Servers
     * const servers = await prisma.server.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serverWithIdOnly = await prisma.server.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServerFindManyArgs>(args?: SelectSubset<T, ServerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Server.
     * @param {ServerCreateArgs} args - Arguments to create a Server.
     * @example
     * // Create one Server
     * const Server = await prisma.server.create({
     *   data: {
     *     // ... data to create a Server
     *   }
     * })
     * 
     */
    create<T extends ServerCreateArgs>(args: SelectSubset<T, ServerCreateArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Servers.
     * @param {ServerCreateManyArgs} args - Arguments to create many Servers.
     * @example
     * // Create many Servers
     * const server = await prisma.server.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServerCreateManyArgs>(args?: SelectSubset<T, ServerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Servers and returns the data saved in the database.
     * @param {ServerCreateManyAndReturnArgs} args - Arguments to create many Servers.
     * @example
     * // Create many Servers
     * const server = await prisma.server.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Servers and only return the `id`
     * const serverWithIdOnly = await prisma.server.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServerCreateManyAndReturnArgs>(args?: SelectSubset<T, ServerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Server.
     * @param {ServerDeleteArgs} args - Arguments to delete one Server.
     * @example
     * // Delete one Server
     * const Server = await prisma.server.delete({
     *   where: {
     *     // ... filter to delete one Server
     *   }
     * })
     * 
     */
    delete<T extends ServerDeleteArgs>(args: SelectSubset<T, ServerDeleteArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Server.
     * @param {ServerUpdateArgs} args - Arguments to update one Server.
     * @example
     * // Update one Server
     * const server = await prisma.server.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServerUpdateArgs>(args: SelectSubset<T, ServerUpdateArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Servers.
     * @param {ServerDeleteManyArgs} args - Arguments to filter Servers to delete.
     * @example
     * // Delete a few Servers
     * const { count } = await prisma.server.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServerDeleteManyArgs>(args?: SelectSubset<T, ServerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Servers
     * const server = await prisma.server.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServerUpdateManyArgs>(args: SelectSubset<T, ServerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servers and returns the data updated in the database.
     * @param {ServerUpdateManyAndReturnArgs} args - Arguments to update many Servers.
     * @example
     * // Update many Servers
     * const server = await prisma.server.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Servers and only return the `id`
     * const serverWithIdOnly = await prisma.server.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServerUpdateManyAndReturnArgs>(args: SelectSubset<T, ServerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Server.
     * @param {ServerUpsertArgs} args - Arguments to update or create a Server.
     * @example
     * // Update or create a Server
     * const server = await prisma.server.upsert({
     *   create: {
     *     // ... data to create a Server
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Server we want to update
     *   }
     * })
     */
    upsert<T extends ServerUpsertArgs>(args: SelectSubset<T, ServerUpsertArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Servers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerCountArgs} args - Arguments to filter Servers to count.
     * @example
     * // Count the number of Servers
     * const count = await prisma.server.count({
     *   where: {
     *     // ... the filter for the Servers we want to count
     *   }
     * })
    **/
    count<T extends ServerCountArgs>(
      args?: Subset<T, ServerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Server.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServerAggregateArgs>(args: Subset<T, ServerAggregateArgs>): Prisma.PrismaPromise<GetServerAggregateType<T>>

    /**
     * Group by Server.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServerGroupByArgs['orderBy'] }
        : { orderBy?: ServerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Server model
   */
  readonly fields: ServerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Server.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Server$membersArgs<ExtArgs> = {}>(args?: Subset<T, Server$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    channels<T extends Server$channelsArgs<ExtArgs> = {}>(args?: Subset<T, Server$channelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Server model
   */
  interface ServerFieldRefs {
    readonly id: FieldRef<"Server", 'String'>
    readonly name: FieldRef<"Server", 'String'>
    readonly imageUrl: FieldRef<"Server", 'String'>
    readonly inviteCode: FieldRef<"Server", 'String'>
    readonly profileId: FieldRef<"Server", 'String'>
    readonly createdAt: FieldRef<"Server", 'DateTime'>
    readonly updatedAt: FieldRef<"Server", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Server findUnique
   */
  export type ServerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server findUniqueOrThrow
   */
  export type ServerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server findFirst
   */
  export type ServerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servers.
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servers.
     */
    distinct?: ServerScalarFieldEnum | ServerScalarFieldEnum[]
  }

  /**
   * Server findFirstOrThrow
   */
  export type ServerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Server to fetch.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servers.
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servers.
     */
    distinct?: ServerScalarFieldEnum | ServerScalarFieldEnum[]
  }

  /**
   * Server findMany
   */
  export type ServerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter, which Servers to fetch.
     */
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     */
    orderBy?: ServerOrderByWithRelationInput | ServerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Servers.
     */
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     */
    skip?: number
    distinct?: ServerScalarFieldEnum | ServerScalarFieldEnum[]
  }

  /**
   * Server create
   */
  export type ServerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * The data needed to create a Server.
     */
    data: XOR<ServerCreateInput, ServerUncheckedCreateInput>
  }

  /**
   * Server createMany
   */
  export type ServerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Servers.
     */
    data: ServerCreateManyInput | ServerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Server createManyAndReturn
   */
  export type ServerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * The data used to create many Servers.
     */
    data: ServerCreateManyInput | ServerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Server update
   */
  export type ServerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * The data needed to update a Server.
     */
    data: XOR<ServerUpdateInput, ServerUncheckedUpdateInput>
    /**
     * Choose, which Server to update.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server updateMany
   */
  export type ServerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Servers.
     */
    data: XOR<ServerUpdateManyMutationInput, ServerUncheckedUpdateManyInput>
    /**
     * Filter which Servers to update
     */
    where?: ServerWhereInput
    /**
     * Limit how many Servers to update.
     */
    limit?: number
  }

  /**
   * Server updateManyAndReturn
   */
  export type ServerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * The data used to update Servers.
     */
    data: XOR<ServerUpdateManyMutationInput, ServerUncheckedUpdateManyInput>
    /**
     * Filter which Servers to update
     */
    where?: ServerWhereInput
    /**
     * Limit how many Servers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Server upsert
   */
  export type ServerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * The filter to search for the Server to update in case it exists.
     */
    where: ServerWhereUniqueInput
    /**
     * In case the Server found by the `where` argument doesn't exist, create a new Server with this data.
     */
    create: XOR<ServerCreateInput, ServerUncheckedCreateInput>
    /**
     * In case the Server was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServerUpdateInput, ServerUncheckedUpdateInput>
  }

  /**
   * Server delete
   */
  export type ServerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
    /**
     * Filter which Server to delete.
     */
    where: ServerWhereUniqueInput
  }

  /**
   * Server deleteMany
   */
  export type ServerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Servers to delete
     */
    where?: ServerWhereInput
    /**
     * Limit how many Servers to delete.
     */
    limit?: number
  }

  /**
   * Server.members
   */
  export type Server$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    cursor?: MemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Server.channels
   */
  export type Server$channelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    where?: ChannelWhereInput
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    cursor?: ChannelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Server without action
   */
  export type ServerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Server
     */
    select?: ServerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Server
     */
    omit?: ServerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServerInclude<ExtArgs> | null
  }


  /**
   * Model Member
   */

  export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  export type MemberMinAggregateOutputType = {
    id: string | null
    role: $Enums.MemberRole | null
    profileId: string | null
    serverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberMaxAggregateOutputType = {
    id: string | null
    role: $Enums.MemberRole | null
    profileId: string | null
    serverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberCountAggregateOutputType = {
    id: number
    role: number
    profileId: number
    serverId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberMinAggregateInputType = {
    id?: true
    role?: true
    profileId?: true
    serverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberMaxAggregateInputType = {
    id?: true
    role?: true
    profileId?: true
    serverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberCountAggregateInputType = {
    id?: true
    role?: true
    profileId?: true
    serverId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Member to aggregate.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Members
    **/
    _count?: true | MemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberMaxAggregateInputType
  }

  export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
        [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMember[P]>
      : GetScalarType<T[P], AggregateMember[P]>
  }




  export type MemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithAggregationInput | MemberOrderByWithAggregationInput[]
    by: MemberScalarFieldEnum[] | MemberScalarFieldEnum
    having?: MemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberCountAggregateInputType | true
    _min?: MemberMinAggregateInputType
    _max?: MemberMaxAggregateInputType
  }

  export type MemberGroupByOutputType = {
    id: string
    role: $Enums.MemberRole
    profileId: string
    serverId: string
    createdAt: Date
    updatedAt: Date
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberGroupByOutputType[P]>
            : GetScalarType<T[P], MemberGroupByOutputType[P]>
        }
      >
    >


  export type MemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    profileId?: boolean
    serverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
    conversationsInitiated?: boolean | Member$conversationsInitiatedArgs<ExtArgs>
    conversationsReceived?: boolean | Member$conversationsReceivedArgs<ExtArgs>
    groupConversations?: boolean | Member$groupConversationsArgs<ExtArgs>
    groupMessages?: boolean | Member$groupMessagesArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type MemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    profileId?: boolean
    serverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type MemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    profileId?: boolean
    serverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type MemberSelectScalar = {
    id?: boolean
    role?: boolean
    profileId?: boolean
    serverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "profileId" | "serverId" | "createdAt" | "updatedAt", ExtArgs["result"]["member"]>
  export type MemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
    conversationsInitiated?: boolean | Member$conversationsInitiatedArgs<ExtArgs>
    conversationsReceived?: boolean | Member$conversationsReceivedArgs<ExtArgs>
    groupConversations?: boolean | Member$groupConversationsArgs<ExtArgs>
    groupMessages?: boolean | Member$groupMessagesArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }
  export type MemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }

  export type $MemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Member"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      server: Prisma.$ServerPayload<ExtArgs>
      conversationsInitiated: Prisma.$ConversationPayload<ExtArgs>[]
      conversationsReceived: Prisma.$ConversationPayload<ExtArgs>[]
      groupConversations: Prisma.$GroupConversationMemberPayload<ExtArgs>[]
      groupMessages: Prisma.$GroupMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.MemberRole
      profileId: string
      serverId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["member"]>
    composites: {}
  }

  type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = $Result.GetResult<Prisma.$MemberPayload, S>

  type MemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberCountAggregateInputType | true
    }

  export interface MemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Member'], meta: { name: 'Member' } }
    /**
     * Find zero or one Member that matches the filter.
     * @param {MemberFindUniqueArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberFindUniqueArgs>(args: SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Member that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemberFindUniqueOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberFindFirstArgs>(args?: SelectSubset<T, MemberFindFirstArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Members
     * const members = await prisma.member.findMany()
     * 
     * // Get first 10 Members
     * const members = await prisma.member.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberWithIdOnly = await prisma.member.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberFindManyArgs>(args?: SelectSubset<T, MemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Member.
     * @param {MemberCreateArgs} args - Arguments to create a Member.
     * @example
     * // Create one Member
     * const Member = await prisma.member.create({
     *   data: {
     *     // ... data to create a Member
     *   }
     * })
     * 
     */
    create<T extends MemberCreateArgs>(args: SelectSubset<T, MemberCreateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Members.
     * @param {MemberCreateManyArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberCreateManyArgs>(args?: SelectSubset<T, MemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Members and returns the data saved in the database.
     * @param {MemberCreateManyAndReturnArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Member.
     * @param {MemberDeleteArgs} args - Arguments to delete one Member.
     * @example
     * // Delete one Member
     * const Member = await prisma.member.delete({
     *   where: {
     *     // ... filter to delete one Member
     *   }
     * })
     * 
     */
    delete<T extends MemberDeleteArgs>(args: SelectSubset<T, MemberDeleteArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Member.
     * @param {MemberUpdateArgs} args - Arguments to update one Member.
     * @example
     * // Update one Member
     * const member = await prisma.member.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberUpdateArgs>(args: SelectSubset<T, MemberUpdateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Members.
     * @param {MemberDeleteManyArgs} args - Arguments to filter Members to delete.
     * @example
     * // Delete a few Members
     * const { count } = await prisma.member.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberDeleteManyArgs>(args?: SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberUpdateManyArgs>(args: SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members and returns the data updated in the database.
     * @param {MemberUpdateManyAndReturnArgs} args - Arguments to update many Members.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemberUpdateManyAndReturnArgs>(args: SelectSubset<T, MemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Member.
     * @param {MemberUpsertArgs} args - Arguments to update or create a Member.
     * @example
     * // Update or create a Member
     * const member = await prisma.member.upsert({
     *   create: {
     *     // ... data to create a Member
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Member we want to update
     *   }
     * })
     */
    upsert<T extends MemberUpsertArgs>(args: SelectSubset<T, MemberUpsertArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCountArgs} args - Arguments to filter Members to count.
     * @example
     * // Count the number of Members
     * const count = await prisma.member.count({
     *   where: {
     *     // ... the filter for the Members we want to count
     *   }
     * })
    **/
    count<T extends MemberCountArgs>(
      args?: Subset<T, MemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberAggregateArgs>(args: Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>

    /**
     * Group by Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberGroupByArgs['orderBy'] }
        : { orderBy?: MemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Member model
   */
  readonly fields: MemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Member.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    server<T extends ServerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServerDefaultArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conversationsInitiated<T extends Member$conversationsInitiatedArgs<ExtArgs> = {}>(args?: Subset<T, Member$conversationsInitiatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversationsReceived<T extends Member$conversationsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, Member$conversationsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupConversations<T extends Member$groupConversationsArgs<ExtArgs> = {}>(args?: Subset<T, Member$groupConversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupMessages<T extends Member$groupMessagesArgs<ExtArgs> = {}>(args?: Subset<T, Member$groupMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Member model
   */
  interface MemberFieldRefs {
    readonly id: FieldRef<"Member", 'String'>
    readonly role: FieldRef<"Member", 'MemberRole'>
    readonly profileId: FieldRef<"Member", 'String'>
    readonly serverId: FieldRef<"Member", 'String'>
    readonly createdAt: FieldRef<"Member", 'DateTime'>
    readonly updatedAt: FieldRef<"Member", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Member findUnique
   */
  export type MemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findUniqueOrThrow
   */
  export type MemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findFirst
   */
  export type MemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findFirstOrThrow
   */
  export type MemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findMany
   */
  export type MemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Members to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member create
   */
  export type MemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to create a Member.
     */
    data: XOR<MemberCreateInput, MemberUncheckedCreateInput>
  }

  /**
   * Member createMany
   */
  export type MemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Member createManyAndReturn
   */
  export type MemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Member update
   */
  export type MemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to update a Member.
     */
    data: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
    /**
     * Choose, which Member to update.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member updateMany
   */
  export type MemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to update.
     */
    limit?: number
  }

  /**
   * Member updateManyAndReturn
   */
  export type MemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Member upsert
   */
  export type MemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The filter to search for the Member to update in case it exists.
     */
    where: MemberWhereUniqueInput
    /**
     * In case the Member found by the `where` argument doesn't exist, create a new Member with this data.
     */
    create: XOR<MemberCreateInput, MemberUncheckedCreateInput>
    /**
     * In case the Member was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
  }

  /**
   * Member delete
   */
  export type MemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter which Member to delete.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member deleteMany
   */
  export type MemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Members to delete
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to delete.
     */
    limit?: number
  }

  /**
   * Member.conversationsInitiated
   */
  export type Member$conversationsInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Member.conversationsReceived
   */
  export type Member$conversationsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Member.groupConversations
   */
  export type Member$groupConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    where?: GroupConversationMemberWhereInput
    orderBy?: GroupConversationMemberOrderByWithRelationInput | GroupConversationMemberOrderByWithRelationInput[]
    cursor?: GroupConversationMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupConversationMemberScalarFieldEnum | GroupConversationMemberScalarFieldEnum[]
  }

  /**
   * Member.groupMessages
   */
  export type Member$groupMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    where?: GroupMessageWhereInput
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    cursor?: GroupMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupMessageScalarFieldEnum | GroupMessageScalarFieldEnum[]
  }

  /**
   * Member without action
   */
  export type MemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
  }


  /**
   * Model Channel
   */

  export type AggregateChannel = {
    _count: ChannelCountAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  export type ChannelMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.ChannelType | null
    profileId: string | null
    serverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChannelMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.ChannelType | null
    profileId: string | null
    serverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChannelCountAggregateOutputType = {
    id: number
    name: number
    type: number
    profileId: number
    serverId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChannelMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    profileId?: true
    serverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChannelMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    profileId?: true
    serverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChannelCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    profileId?: true
    serverId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChannelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Channel to aggregate.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Channels
    **/
    _count?: true | ChannelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChannelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChannelMaxAggregateInputType
  }

  export type GetChannelAggregateType<T extends ChannelAggregateArgs> = {
        [P in keyof T & keyof AggregateChannel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChannel[P]>
      : GetScalarType<T[P], AggregateChannel[P]>
  }




  export type ChannelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelWhereInput
    orderBy?: ChannelOrderByWithAggregationInput | ChannelOrderByWithAggregationInput[]
    by: ChannelScalarFieldEnum[] | ChannelScalarFieldEnum
    having?: ChannelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChannelCountAggregateInputType | true
    _min?: ChannelMinAggregateInputType
    _max?: ChannelMaxAggregateInputType
  }

  export type ChannelGroupByOutputType = {
    id: string
    name: string
    type: $Enums.ChannelType
    profileId: string
    serverId: string
    createdAt: Date
    updatedAt: Date
    _count: ChannelCountAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  type GetChannelGroupByPayload<T extends ChannelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChannelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChannelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChannelGroupByOutputType[P]>
            : GetScalarType<T[P], ChannelGroupByOutputType[P]>
        }
      >
    >


  export type ChannelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    profileId?: boolean
    serverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    profileId?: boolean
    serverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    profileId?: boolean
    serverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channel"]>

  export type ChannelSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    profileId?: boolean
    serverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChannelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "profileId" | "serverId" | "createdAt" | "updatedAt", ExtArgs["result"]["channel"]>
  export type ChannelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }
  export type ChannelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }
  export type ChannelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    server?: boolean | ServerDefaultArgs<ExtArgs>
  }

  export type $ChannelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Channel"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      server: Prisma.$ServerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.ChannelType
      profileId: string
      serverId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["channel"]>
    composites: {}
  }

  type ChannelGetPayload<S extends boolean | null | undefined | ChannelDefaultArgs> = $Result.GetResult<Prisma.$ChannelPayload, S>

  type ChannelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChannelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChannelCountAggregateInputType | true
    }

  export interface ChannelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Channel'], meta: { name: 'Channel' } }
    /**
     * Find zero or one Channel that matches the filter.
     * @param {ChannelFindUniqueArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChannelFindUniqueArgs>(args: SelectSubset<T, ChannelFindUniqueArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Channel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChannelFindUniqueOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChannelFindUniqueOrThrowArgs>(args: SelectSubset<T, ChannelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Channel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChannelFindFirstArgs>(args?: SelectSubset<T, ChannelFindFirstArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Channel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChannelFindFirstOrThrowArgs>(args?: SelectSubset<T, ChannelFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Channels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Channels
     * const channels = await prisma.channel.findMany()
     * 
     * // Get first 10 Channels
     * const channels = await prisma.channel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const channelWithIdOnly = await prisma.channel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChannelFindManyArgs>(args?: SelectSubset<T, ChannelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Channel.
     * @param {ChannelCreateArgs} args - Arguments to create a Channel.
     * @example
     * // Create one Channel
     * const Channel = await prisma.channel.create({
     *   data: {
     *     // ... data to create a Channel
     *   }
     * })
     * 
     */
    create<T extends ChannelCreateArgs>(args: SelectSubset<T, ChannelCreateArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Channels.
     * @param {ChannelCreateManyArgs} args - Arguments to create many Channels.
     * @example
     * // Create many Channels
     * const channel = await prisma.channel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChannelCreateManyArgs>(args?: SelectSubset<T, ChannelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Channels and returns the data saved in the database.
     * @param {ChannelCreateManyAndReturnArgs} args - Arguments to create many Channels.
     * @example
     * // Create many Channels
     * const channel = await prisma.channel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Channels and only return the `id`
     * const channelWithIdOnly = await prisma.channel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChannelCreateManyAndReturnArgs>(args?: SelectSubset<T, ChannelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Channel.
     * @param {ChannelDeleteArgs} args - Arguments to delete one Channel.
     * @example
     * // Delete one Channel
     * const Channel = await prisma.channel.delete({
     *   where: {
     *     // ... filter to delete one Channel
     *   }
     * })
     * 
     */
    delete<T extends ChannelDeleteArgs>(args: SelectSubset<T, ChannelDeleteArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Channel.
     * @param {ChannelUpdateArgs} args - Arguments to update one Channel.
     * @example
     * // Update one Channel
     * const channel = await prisma.channel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChannelUpdateArgs>(args: SelectSubset<T, ChannelUpdateArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Channels.
     * @param {ChannelDeleteManyArgs} args - Arguments to filter Channels to delete.
     * @example
     * // Delete a few Channels
     * const { count } = await prisma.channel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChannelDeleteManyArgs>(args?: SelectSubset<T, ChannelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Channels
     * const channel = await prisma.channel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChannelUpdateManyArgs>(args: SelectSubset<T, ChannelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channels and returns the data updated in the database.
     * @param {ChannelUpdateManyAndReturnArgs} args - Arguments to update many Channels.
     * @example
     * // Update many Channels
     * const channel = await prisma.channel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Channels and only return the `id`
     * const channelWithIdOnly = await prisma.channel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChannelUpdateManyAndReturnArgs>(args: SelectSubset<T, ChannelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Channel.
     * @param {ChannelUpsertArgs} args - Arguments to update or create a Channel.
     * @example
     * // Update or create a Channel
     * const channel = await prisma.channel.upsert({
     *   create: {
     *     // ... data to create a Channel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Channel we want to update
     *   }
     * })
     */
    upsert<T extends ChannelUpsertArgs>(args: SelectSubset<T, ChannelUpsertArgs<ExtArgs>>): Prisma__ChannelClient<$Result.GetResult<Prisma.$ChannelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelCountArgs} args - Arguments to filter Channels to count.
     * @example
     * // Count the number of Channels
     * const count = await prisma.channel.count({
     *   where: {
     *     // ... the filter for the Channels we want to count
     *   }
     * })
    **/
    count<T extends ChannelCountArgs>(
      args?: Subset<T, ChannelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChannelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChannelAggregateArgs>(args: Subset<T, ChannelAggregateArgs>): Prisma.PrismaPromise<GetChannelAggregateType<T>>

    /**
     * Group by Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChannelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChannelGroupByArgs['orderBy'] }
        : { orderBy?: ChannelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChannelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Channel model
   */
  readonly fields: ChannelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Channel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChannelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    server<T extends ServerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServerDefaultArgs<ExtArgs>>): Prisma__ServerClient<$Result.GetResult<Prisma.$ServerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Channel model
   */
  interface ChannelFieldRefs {
    readonly id: FieldRef<"Channel", 'String'>
    readonly name: FieldRef<"Channel", 'String'>
    readonly type: FieldRef<"Channel", 'ChannelType'>
    readonly profileId: FieldRef<"Channel", 'String'>
    readonly serverId: FieldRef<"Channel", 'String'>
    readonly createdAt: FieldRef<"Channel", 'DateTime'>
    readonly updatedAt: FieldRef<"Channel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Channel findUnique
   */
  export type ChannelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel findUniqueOrThrow
   */
  export type ChannelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel findFirst
   */
  export type ChannelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel findFirstOrThrow
   */
  export type ChannelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel findMany
   */
  export type ChannelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter, which Channels to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: ChannelOrderByWithRelationInput | ChannelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    distinct?: ChannelScalarFieldEnum | ChannelScalarFieldEnum[]
  }

  /**
   * Channel create
   */
  export type ChannelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The data needed to create a Channel.
     */
    data: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
  }

  /**
   * Channel createMany
   */
  export type ChannelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Channels.
     */
    data: ChannelCreateManyInput | ChannelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Channel createManyAndReturn
   */
  export type ChannelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * The data used to create many Channels.
     */
    data: ChannelCreateManyInput | ChannelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Channel update
   */
  export type ChannelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The data needed to update a Channel.
     */
    data: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
    /**
     * Choose, which Channel to update.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel updateMany
   */
  export type ChannelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Channels.
     */
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyInput>
    /**
     * Filter which Channels to update
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to update.
     */
    limit?: number
  }

  /**
   * Channel updateManyAndReturn
   */
  export type ChannelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * The data used to update Channels.
     */
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyInput>
    /**
     * Filter which Channels to update
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Channel upsert
   */
  export type ChannelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * The filter to search for the Channel to update in case it exists.
     */
    where: ChannelWhereUniqueInput
    /**
     * In case the Channel found by the `where` argument doesn't exist, create a new Channel with this data.
     */
    create: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
    /**
     * In case the Channel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
  }

  /**
   * Channel delete
   */
  export type ChannelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
    /**
     * Filter which Channel to delete.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel deleteMany
   */
  export type ChannelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Channels to delete
     */
    where?: ChannelWhereInput
    /**
     * Limit how many Channels to delete.
     */
    limit?: number
  }

  /**
   * Channel without action
   */
  export type ChannelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Channel
     */
    omit?: ChannelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    memberOneId: string | null
    memberTwoId: string | null
    profileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    memberOneId: string | null
    memberTwoId: string | null
    profileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    memberOneId: number
    memberTwoId: number
    profileId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    memberOneId?: true
    memberTwoId?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    memberOneId?: true
    memberTwoId?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    memberOneId?: true
    memberTwoId?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    memberOneId: string
    memberTwoId: string
    profileId: string
    createdAt: Date
    updatedAt: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberOneId?: boolean
    memberTwoId?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    memberOne?: boolean | MemberDefaultArgs<ExtArgs>
    memberTwo?: boolean | MemberDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberOneId?: boolean
    memberTwoId?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    memberOne?: boolean | MemberDefaultArgs<ExtArgs>
    memberTwo?: boolean | MemberDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberOneId?: boolean
    memberTwoId?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    memberOne?: boolean | MemberDefaultArgs<ExtArgs>
    memberTwo?: boolean | MemberDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    memberOneId?: boolean
    memberTwoId?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberOneId" | "memberTwoId" | "profileId" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberOne?: boolean | MemberDefaultArgs<ExtArgs>
    memberTwo?: boolean | MemberDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberOne?: boolean | MemberDefaultArgs<ExtArgs>
    memberTwo?: boolean | MemberDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberOne?: boolean | MemberDefaultArgs<ExtArgs>
    memberTwo?: boolean | MemberDefaultArgs<ExtArgs>
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      memberOne: Prisma.$MemberPayload<ExtArgs>
      memberTwo: Prisma.$MemberPayload<ExtArgs>
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberOneId: string
      memberTwoId: string
      profileId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memberOne<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    memberTwo<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly memberOneId: FieldRef<"Conversation", 'String'>
    readonly memberTwoId: FieldRef<"Conversation", 'String'>
    readonly profileId: FieldRef<"Conversation", 'String'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
  }

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
    /**
     * Limit how many Conversations to delete.
     */
    limit?: number
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model GroupConversation
   */

  export type AggregateGroupConversation = {
    _count: GroupConversationCountAggregateOutputType | null
    _min: GroupConversationMinAggregateOutputType | null
    _max: GroupConversationMaxAggregateOutputType | null
  }

  export type GroupConversationMinAggregateOutputType = {
    id: string | null
    name: string | null
    imageUrl: string | null
    profileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupConversationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    imageUrl: string | null
    profileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupConversationCountAggregateOutputType = {
    id: number
    name: number
    imageUrl: number
    profileId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupConversationMinAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupConversationMaxAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupConversationCountAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
    profileId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupConversation to aggregate.
     */
    where?: GroupConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConversations to fetch.
     */
    orderBy?: GroupConversationOrderByWithRelationInput | GroupConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupConversations
    **/
    _count?: true | GroupConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupConversationMaxAggregateInputType
  }

  export type GetGroupConversationAggregateType<T extends GroupConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupConversation[P]>
      : GetScalarType<T[P], AggregateGroupConversation[P]>
  }




  export type GroupConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupConversationWhereInput
    orderBy?: GroupConversationOrderByWithAggregationInput | GroupConversationOrderByWithAggregationInput[]
    by: GroupConversationScalarFieldEnum[] | GroupConversationScalarFieldEnum
    having?: GroupConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupConversationCountAggregateInputType | true
    _min?: GroupConversationMinAggregateInputType
    _max?: GroupConversationMaxAggregateInputType
  }

  export type GroupConversationGroupByOutputType = {
    id: string
    name: string
    imageUrl: string | null
    profileId: string
    createdAt: Date
    updatedAt: Date
    _count: GroupConversationCountAggregateOutputType | null
    _min: GroupConversationMinAggregateOutputType | null
    _max: GroupConversationMaxAggregateOutputType | null
  }

  type GetGroupConversationGroupByPayload<T extends GroupConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupConversationGroupByOutputType[P]>
            : GetScalarType<T[P], GroupConversationGroupByOutputType[P]>
        }
      >
    >


  export type GroupConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    members?: boolean | GroupConversation$membersArgs<ExtArgs>
    messages?: boolean | GroupConversation$messagesArgs<ExtArgs>
    _count?: boolean | GroupConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupConversation"]>

  export type GroupConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupConversation"]>

  export type GroupConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupConversation"]>

  export type GroupConversationSelectScalar = {
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    profileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GroupConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "imageUrl" | "profileId" | "createdAt" | "updatedAt", ExtArgs["result"]["groupConversation"]>
  export type GroupConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    members?: boolean | GroupConversation$membersArgs<ExtArgs>
    messages?: boolean | GroupConversation$messagesArgs<ExtArgs>
    _count?: boolean | GroupConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type GroupConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $GroupConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupConversation"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      members: Prisma.$GroupConversationMemberPayload<ExtArgs>[]
      messages: Prisma.$GroupMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      imageUrl: string | null
      profileId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["groupConversation"]>
    composites: {}
  }

  type GroupConversationGetPayload<S extends boolean | null | undefined | GroupConversationDefaultArgs> = $Result.GetResult<Prisma.$GroupConversationPayload, S>

  type GroupConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupConversationCountAggregateInputType | true
    }

  export interface GroupConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupConversation'], meta: { name: 'GroupConversation' } }
    /**
     * Find zero or one GroupConversation that matches the filter.
     * @param {GroupConversationFindUniqueArgs} args - Arguments to find a GroupConversation
     * @example
     * // Get one GroupConversation
     * const groupConversation = await prisma.groupConversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupConversationFindUniqueArgs>(args: SelectSubset<T, GroupConversationFindUniqueArgs<ExtArgs>>): Prisma__GroupConversationClient<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupConversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupConversationFindUniqueOrThrowArgs} args - Arguments to find a GroupConversation
     * @example
     * // Get one GroupConversation
     * const groupConversation = await prisma.groupConversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupConversationClient<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupConversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationFindFirstArgs} args - Arguments to find a GroupConversation
     * @example
     * // Get one GroupConversation
     * const groupConversation = await prisma.groupConversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupConversationFindFirstArgs>(args?: SelectSubset<T, GroupConversationFindFirstArgs<ExtArgs>>): Prisma__GroupConversationClient<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupConversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationFindFirstOrThrowArgs} args - Arguments to find a GroupConversation
     * @example
     * // Get one GroupConversation
     * const groupConversation = await prisma.groupConversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupConversationClient<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupConversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupConversations
     * const groupConversations = await prisma.groupConversation.findMany()
     * 
     * // Get first 10 GroupConversations
     * const groupConversations = await prisma.groupConversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupConversationWithIdOnly = await prisma.groupConversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupConversationFindManyArgs>(args?: SelectSubset<T, GroupConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupConversation.
     * @param {GroupConversationCreateArgs} args - Arguments to create a GroupConversation.
     * @example
     * // Create one GroupConversation
     * const GroupConversation = await prisma.groupConversation.create({
     *   data: {
     *     // ... data to create a GroupConversation
     *   }
     * })
     * 
     */
    create<T extends GroupConversationCreateArgs>(args: SelectSubset<T, GroupConversationCreateArgs<ExtArgs>>): Prisma__GroupConversationClient<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupConversations.
     * @param {GroupConversationCreateManyArgs} args - Arguments to create many GroupConversations.
     * @example
     * // Create many GroupConversations
     * const groupConversation = await prisma.groupConversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupConversationCreateManyArgs>(args?: SelectSubset<T, GroupConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupConversations and returns the data saved in the database.
     * @param {GroupConversationCreateManyAndReturnArgs} args - Arguments to create many GroupConversations.
     * @example
     * // Create many GroupConversations
     * const groupConversation = await prisma.groupConversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupConversations and only return the `id`
     * const groupConversationWithIdOnly = await prisma.groupConversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupConversation.
     * @param {GroupConversationDeleteArgs} args - Arguments to delete one GroupConversation.
     * @example
     * // Delete one GroupConversation
     * const GroupConversation = await prisma.groupConversation.delete({
     *   where: {
     *     // ... filter to delete one GroupConversation
     *   }
     * })
     * 
     */
    delete<T extends GroupConversationDeleteArgs>(args: SelectSubset<T, GroupConversationDeleteArgs<ExtArgs>>): Prisma__GroupConversationClient<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupConversation.
     * @param {GroupConversationUpdateArgs} args - Arguments to update one GroupConversation.
     * @example
     * // Update one GroupConversation
     * const groupConversation = await prisma.groupConversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupConversationUpdateArgs>(args: SelectSubset<T, GroupConversationUpdateArgs<ExtArgs>>): Prisma__GroupConversationClient<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupConversations.
     * @param {GroupConversationDeleteManyArgs} args - Arguments to filter GroupConversations to delete.
     * @example
     * // Delete a few GroupConversations
     * const { count } = await prisma.groupConversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupConversationDeleteManyArgs>(args?: SelectSubset<T, GroupConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupConversations
     * const groupConversation = await prisma.groupConversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupConversationUpdateManyArgs>(args: SelectSubset<T, GroupConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupConversations and returns the data updated in the database.
     * @param {GroupConversationUpdateManyAndReturnArgs} args - Arguments to update many GroupConversations.
     * @example
     * // Update many GroupConversations
     * const groupConversation = await prisma.groupConversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupConversations and only return the `id`
     * const groupConversationWithIdOnly = await prisma.groupConversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupConversation.
     * @param {GroupConversationUpsertArgs} args - Arguments to update or create a GroupConversation.
     * @example
     * // Update or create a GroupConversation
     * const groupConversation = await prisma.groupConversation.upsert({
     *   create: {
     *     // ... data to create a GroupConversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupConversation we want to update
     *   }
     * })
     */
    upsert<T extends GroupConversationUpsertArgs>(args: SelectSubset<T, GroupConversationUpsertArgs<ExtArgs>>): Prisma__GroupConversationClient<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationCountArgs} args - Arguments to filter GroupConversations to count.
     * @example
     * // Count the number of GroupConversations
     * const count = await prisma.groupConversation.count({
     *   where: {
     *     // ... the filter for the GroupConversations we want to count
     *   }
     * })
    **/
    count<T extends GroupConversationCountArgs>(
      args?: Subset<T, GroupConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupConversationAggregateArgs>(args: Subset<T, GroupConversationAggregateArgs>): Prisma.PrismaPromise<GetGroupConversationAggregateType<T>>

    /**
     * Group by GroupConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupConversationGroupByArgs['orderBy'] }
        : { orderBy?: GroupConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupConversation model
   */
  readonly fields: GroupConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupConversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends GroupConversation$membersArgs<ExtArgs> = {}>(args?: Subset<T, GroupConversation$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends GroupConversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, GroupConversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupConversation model
   */
  interface GroupConversationFieldRefs {
    readonly id: FieldRef<"GroupConversation", 'String'>
    readonly name: FieldRef<"GroupConversation", 'String'>
    readonly imageUrl: FieldRef<"GroupConversation", 'String'>
    readonly profileId: FieldRef<"GroupConversation", 'String'>
    readonly createdAt: FieldRef<"GroupConversation", 'DateTime'>
    readonly updatedAt: FieldRef<"GroupConversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GroupConversation findUnique
   */
  export type GroupConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationInclude<ExtArgs> | null
    /**
     * Filter, which GroupConversation to fetch.
     */
    where: GroupConversationWhereUniqueInput
  }

  /**
   * GroupConversation findUniqueOrThrow
   */
  export type GroupConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationInclude<ExtArgs> | null
    /**
     * Filter, which GroupConversation to fetch.
     */
    where: GroupConversationWhereUniqueInput
  }

  /**
   * GroupConversation findFirst
   */
  export type GroupConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationInclude<ExtArgs> | null
    /**
     * Filter, which GroupConversation to fetch.
     */
    where?: GroupConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConversations to fetch.
     */
    orderBy?: GroupConversationOrderByWithRelationInput | GroupConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupConversations.
     */
    cursor?: GroupConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupConversations.
     */
    distinct?: GroupConversationScalarFieldEnum | GroupConversationScalarFieldEnum[]
  }

  /**
   * GroupConversation findFirstOrThrow
   */
  export type GroupConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationInclude<ExtArgs> | null
    /**
     * Filter, which GroupConversation to fetch.
     */
    where?: GroupConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConversations to fetch.
     */
    orderBy?: GroupConversationOrderByWithRelationInput | GroupConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupConversations.
     */
    cursor?: GroupConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupConversations.
     */
    distinct?: GroupConversationScalarFieldEnum | GroupConversationScalarFieldEnum[]
  }

  /**
   * GroupConversation findMany
   */
  export type GroupConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationInclude<ExtArgs> | null
    /**
     * Filter, which GroupConversations to fetch.
     */
    where?: GroupConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConversations to fetch.
     */
    orderBy?: GroupConversationOrderByWithRelationInput | GroupConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupConversations.
     */
    cursor?: GroupConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConversations.
     */
    skip?: number
    distinct?: GroupConversationScalarFieldEnum | GroupConversationScalarFieldEnum[]
  }

  /**
   * GroupConversation create
   */
  export type GroupConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupConversation.
     */
    data: XOR<GroupConversationCreateInput, GroupConversationUncheckedCreateInput>
  }

  /**
   * GroupConversation createMany
   */
  export type GroupConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupConversations.
     */
    data: GroupConversationCreateManyInput | GroupConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupConversation createManyAndReturn
   */
  export type GroupConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * The data used to create many GroupConversations.
     */
    data: GroupConversationCreateManyInput | GroupConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupConversation update
   */
  export type GroupConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupConversation.
     */
    data: XOR<GroupConversationUpdateInput, GroupConversationUncheckedUpdateInput>
    /**
     * Choose, which GroupConversation to update.
     */
    where: GroupConversationWhereUniqueInput
  }

  /**
   * GroupConversation updateMany
   */
  export type GroupConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupConversations.
     */
    data: XOR<GroupConversationUpdateManyMutationInput, GroupConversationUncheckedUpdateManyInput>
    /**
     * Filter which GroupConversations to update
     */
    where?: GroupConversationWhereInput
    /**
     * Limit how many GroupConversations to update.
     */
    limit?: number
  }

  /**
   * GroupConversation updateManyAndReturn
   */
  export type GroupConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * The data used to update GroupConversations.
     */
    data: XOR<GroupConversationUpdateManyMutationInput, GroupConversationUncheckedUpdateManyInput>
    /**
     * Filter which GroupConversations to update
     */
    where?: GroupConversationWhereInput
    /**
     * Limit how many GroupConversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupConversation upsert
   */
  export type GroupConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupConversation to update in case it exists.
     */
    where: GroupConversationWhereUniqueInput
    /**
     * In case the GroupConversation found by the `where` argument doesn't exist, create a new GroupConversation with this data.
     */
    create: XOR<GroupConversationCreateInput, GroupConversationUncheckedCreateInput>
    /**
     * In case the GroupConversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupConversationUpdateInput, GroupConversationUncheckedUpdateInput>
  }

  /**
   * GroupConversation delete
   */
  export type GroupConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationInclude<ExtArgs> | null
    /**
     * Filter which GroupConversation to delete.
     */
    where: GroupConversationWhereUniqueInput
  }

  /**
   * GroupConversation deleteMany
   */
  export type GroupConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupConversations to delete
     */
    where?: GroupConversationWhereInput
    /**
     * Limit how many GroupConversations to delete.
     */
    limit?: number
  }

  /**
   * GroupConversation.members
   */
  export type GroupConversation$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    where?: GroupConversationMemberWhereInput
    orderBy?: GroupConversationMemberOrderByWithRelationInput | GroupConversationMemberOrderByWithRelationInput[]
    cursor?: GroupConversationMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupConversationMemberScalarFieldEnum | GroupConversationMemberScalarFieldEnum[]
  }

  /**
   * GroupConversation.messages
   */
  export type GroupConversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    where?: GroupMessageWhereInput
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    cursor?: GroupMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupMessageScalarFieldEnum | GroupMessageScalarFieldEnum[]
  }

  /**
   * GroupConversation without action
   */
  export type GroupConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversation
     */
    select?: GroupConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversation
     */
    omit?: GroupConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationInclude<ExtArgs> | null
  }


  /**
   * Model GroupConversationMember
   */

  export type AggregateGroupConversationMember = {
    _count: GroupConversationMemberCountAggregateOutputType | null
    _min: GroupConversationMemberMinAggregateOutputType | null
    _max: GroupConversationMemberMaxAggregateOutputType | null
  }

  export type GroupConversationMemberMinAggregateOutputType = {
    id: string | null
    role: $Enums.GroupMemberRole | null
    profileId: string | null
    memberId: string | null
    groupConversationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupConversationMemberMaxAggregateOutputType = {
    id: string | null
    role: $Enums.GroupMemberRole | null
    profileId: string | null
    memberId: string | null
    groupConversationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupConversationMemberCountAggregateOutputType = {
    id: number
    role: number
    profileId: number
    memberId: number
    groupConversationId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupConversationMemberMinAggregateInputType = {
    id?: true
    role?: true
    profileId?: true
    memberId?: true
    groupConversationId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupConversationMemberMaxAggregateInputType = {
    id?: true
    role?: true
    profileId?: true
    memberId?: true
    groupConversationId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupConversationMemberCountAggregateInputType = {
    id?: true
    role?: true
    profileId?: true
    memberId?: true
    groupConversationId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupConversationMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupConversationMember to aggregate.
     */
    where?: GroupConversationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConversationMembers to fetch.
     */
    orderBy?: GroupConversationMemberOrderByWithRelationInput | GroupConversationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupConversationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConversationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConversationMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupConversationMembers
    **/
    _count?: true | GroupConversationMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupConversationMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupConversationMemberMaxAggregateInputType
  }

  export type GetGroupConversationMemberAggregateType<T extends GroupConversationMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupConversationMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupConversationMember[P]>
      : GetScalarType<T[P], AggregateGroupConversationMember[P]>
  }




  export type GroupConversationMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupConversationMemberWhereInput
    orderBy?: GroupConversationMemberOrderByWithAggregationInput | GroupConversationMemberOrderByWithAggregationInput[]
    by: GroupConversationMemberScalarFieldEnum[] | GroupConversationMemberScalarFieldEnum
    having?: GroupConversationMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupConversationMemberCountAggregateInputType | true
    _min?: GroupConversationMemberMinAggregateInputType
    _max?: GroupConversationMemberMaxAggregateInputType
  }

  export type GroupConversationMemberGroupByOutputType = {
    id: string
    role: $Enums.GroupMemberRole
    profileId: string
    memberId: string
    groupConversationId: string
    createdAt: Date
    updatedAt: Date
    _count: GroupConversationMemberCountAggregateOutputType | null
    _min: GroupConversationMemberMinAggregateOutputType | null
    _max: GroupConversationMemberMaxAggregateOutputType | null
  }

  type GetGroupConversationMemberGroupByPayload<T extends GroupConversationMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupConversationMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupConversationMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupConversationMemberGroupByOutputType[P]>
            : GetScalarType<T[P], GroupConversationMemberGroupByOutputType[P]>
        }
      >
    >


  export type GroupConversationMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    profileId?: boolean
    memberId?: boolean
    groupConversationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupConversationMember"]>

  export type GroupConversationMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    profileId?: boolean
    memberId?: boolean
    groupConversationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupConversationMember"]>

  export type GroupConversationMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    profileId?: boolean
    memberId?: boolean
    groupConversationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupConversationMember"]>

  export type GroupConversationMemberSelectScalar = {
    id?: boolean
    role?: boolean
    profileId?: boolean
    memberId?: boolean
    groupConversationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GroupConversationMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "profileId" | "memberId" | "groupConversationId" | "createdAt" | "updatedAt", ExtArgs["result"]["groupConversationMember"]>
  export type GroupConversationMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }
  export type GroupConversationMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }
  export type GroupConversationMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }

  export type $GroupConversationMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupConversationMember"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      member: Prisma.$MemberPayload<ExtArgs>
      groupConversation: Prisma.$GroupConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.GroupMemberRole
      profileId: string
      memberId: string
      groupConversationId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["groupConversationMember"]>
    composites: {}
  }

  type GroupConversationMemberGetPayload<S extends boolean | null | undefined | GroupConversationMemberDefaultArgs> = $Result.GetResult<Prisma.$GroupConversationMemberPayload, S>

  type GroupConversationMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupConversationMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupConversationMemberCountAggregateInputType | true
    }

  export interface GroupConversationMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupConversationMember'], meta: { name: 'GroupConversationMember' } }
    /**
     * Find zero or one GroupConversationMember that matches the filter.
     * @param {GroupConversationMemberFindUniqueArgs} args - Arguments to find a GroupConversationMember
     * @example
     * // Get one GroupConversationMember
     * const groupConversationMember = await prisma.groupConversationMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupConversationMemberFindUniqueArgs>(args: SelectSubset<T, GroupConversationMemberFindUniqueArgs<ExtArgs>>): Prisma__GroupConversationMemberClient<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupConversationMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupConversationMemberFindUniqueOrThrowArgs} args - Arguments to find a GroupConversationMember
     * @example
     * // Get one GroupConversationMember
     * const groupConversationMember = await prisma.groupConversationMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupConversationMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupConversationMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupConversationMemberClient<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupConversationMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationMemberFindFirstArgs} args - Arguments to find a GroupConversationMember
     * @example
     * // Get one GroupConversationMember
     * const groupConversationMember = await prisma.groupConversationMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupConversationMemberFindFirstArgs>(args?: SelectSubset<T, GroupConversationMemberFindFirstArgs<ExtArgs>>): Prisma__GroupConversationMemberClient<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupConversationMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationMemberFindFirstOrThrowArgs} args - Arguments to find a GroupConversationMember
     * @example
     * // Get one GroupConversationMember
     * const groupConversationMember = await prisma.groupConversationMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupConversationMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupConversationMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupConversationMemberClient<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupConversationMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupConversationMembers
     * const groupConversationMembers = await prisma.groupConversationMember.findMany()
     * 
     * // Get first 10 GroupConversationMembers
     * const groupConversationMembers = await prisma.groupConversationMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupConversationMemberWithIdOnly = await prisma.groupConversationMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupConversationMemberFindManyArgs>(args?: SelectSubset<T, GroupConversationMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupConversationMember.
     * @param {GroupConversationMemberCreateArgs} args - Arguments to create a GroupConversationMember.
     * @example
     * // Create one GroupConversationMember
     * const GroupConversationMember = await prisma.groupConversationMember.create({
     *   data: {
     *     // ... data to create a GroupConversationMember
     *   }
     * })
     * 
     */
    create<T extends GroupConversationMemberCreateArgs>(args: SelectSubset<T, GroupConversationMemberCreateArgs<ExtArgs>>): Prisma__GroupConversationMemberClient<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupConversationMembers.
     * @param {GroupConversationMemberCreateManyArgs} args - Arguments to create many GroupConversationMembers.
     * @example
     * // Create many GroupConversationMembers
     * const groupConversationMember = await prisma.groupConversationMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupConversationMemberCreateManyArgs>(args?: SelectSubset<T, GroupConversationMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupConversationMembers and returns the data saved in the database.
     * @param {GroupConversationMemberCreateManyAndReturnArgs} args - Arguments to create many GroupConversationMembers.
     * @example
     * // Create many GroupConversationMembers
     * const groupConversationMember = await prisma.groupConversationMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupConversationMembers and only return the `id`
     * const groupConversationMemberWithIdOnly = await prisma.groupConversationMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupConversationMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupConversationMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupConversationMember.
     * @param {GroupConversationMemberDeleteArgs} args - Arguments to delete one GroupConversationMember.
     * @example
     * // Delete one GroupConversationMember
     * const GroupConversationMember = await prisma.groupConversationMember.delete({
     *   where: {
     *     // ... filter to delete one GroupConversationMember
     *   }
     * })
     * 
     */
    delete<T extends GroupConversationMemberDeleteArgs>(args: SelectSubset<T, GroupConversationMemberDeleteArgs<ExtArgs>>): Prisma__GroupConversationMemberClient<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupConversationMember.
     * @param {GroupConversationMemberUpdateArgs} args - Arguments to update one GroupConversationMember.
     * @example
     * // Update one GroupConversationMember
     * const groupConversationMember = await prisma.groupConversationMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupConversationMemberUpdateArgs>(args: SelectSubset<T, GroupConversationMemberUpdateArgs<ExtArgs>>): Prisma__GroupConversationMemberClient<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupConversationMembers.
     * @param {GroupConversationMemberDeleteManyArgs} args - Arguments to filter GroupConversationMembers to delete.
     * @example
     * // Delete a few GroupConversationMembers
     * const { count } = await prisma.groupConversationMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupConversationMemberDeleteManyArgs>(args?: SelectSubset<T, GroupConversationMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupConversationMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupConversationMembers
     * const groupConversationMember = await prisma.groupConversationMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupConversationMemberUpdateManyArgs>(args: SelectSubset<T, GroupConversationMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupConversationMembers and returns the data updated in the database.
     * @param {GroupConversationMemberUpdateManyAndReturnArgs} args - Arguments to update many GroupConversationMembers.
     * @example
     * // Update many GroupConversationMembers
     * const groupConversationMember = await prisma.groupConversationMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupConversationMembers and only return the `id`
     * const groupConversationMemberWithIdOnly = await prisma.groupConversationMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupConversationMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupConversationMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupConversationMember.
     * @param {GroupConversationMemberUpsertArgs} args - Arguments to update or create a GroupConversationMember.
     * @example
     * // Update or create a GroupConversationMember
     * const groupConversationMember = await prisma.groupConversationMember.upsert({
     *   create: {
     *     // ... data to create a GroupConversationMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupConversationMember we want to update
     *   }
     * })
     */
    upsert<T extends GroupConversationMemberUpsertArgs>(args: SelectSubset<T, GroupConversationMemberUpsertArgs<ExtArgs>>): Prisma__GroupConversationMemberClient<$Result.GetResult<Prisma.$GroupConversationMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupConversationMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationMemberCountArgs} args - Arguments to filter GroupConversationMembers to count.
     * @example
     * // Count the number of GroupConversationMembers
     * const count = await prisma.groupConversationMember.count({
     *   where: {
     *     // ... the filter for the GroupConversationMembers we want to count
     *   }
     * })
    **/
    count<T extends GroupConversationMemberCountArgs>(
      args?: Subset<T, GroupConversationMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupConversationMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupConversationMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupConversationMemberAggregateArgs>(args: Subset<T, GroupConversationMemberAggregateArgs>): Prisma.PrismaPromise<GetGroupConversationMemberAggregateType<T>>

    /**
     * Group by GroupConversationMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConversationMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupConversationMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupConversationMemberGroupByArgs['orderBy'] }
        : { orderBy?: GroupConversationMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupConversationMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupConversationMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupConversationMember model
   */
  readonly fields: GroupConversationMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupConversationMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupConversationMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    groupConversation<T extends GroupConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupConversationDefaultArgs<ExtArgs>>): Prisma__GroupConversationClient<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupConversationMember model
   */
  interface GroupConversationMemberFieldRefs {
    readonly id: FieldRef<"GroupConversationMember", 'String'>
    readonly role: FieldRef<"GroupConversationMember", 'GroupMemberRole'>
    readonly profileId: FieldRef<"GroupConversationMember", 'String'>
    readonly memberId: FieldRef<"GroupConversationMember", 'String'>
    readonly groupConversationId: FieldRef<"GroupConversationMember", 'String'>
    readonly createdAt: FieldRef<"GroupConversationMember", 'DateTime'>
    readonly updatedAt: FieldRef<"GroupConversationMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GroupConversationMember findUnique
   */
  export type GroupConversationMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupConversationMember to fetch.
     */
    where: GroupConversationMemberWhereUniqueInput
  }

  /**
   * GroupConversationMember findUniqueOrThrow
   */
  export type GroupConversationMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupConversationMember to fetch.
     */
    where: GroupConversationMemberWhereUniqueInput
  }

  /**
   * GroupConversationMember findFirst
   */
  export type GroupConversationMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupConversationMember to fetch.
     */
    where?: GroupConversationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConversationMembers to fetch.
     */
    orderBy?: GroupConversationMemberOrderByWithRelationInput | GroupConversationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupConversationMembers.
     */
    cursor?: GroupConversationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConversationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConversationMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupConversationMembers.
     */
    distinct?: GroupConversationMemberScalarFieldEnum | GroupConversationMemberScalarFieldEnum[]
  }

  /**
   * GroupConversationMember findFirstOrThrow
   */
  export type GroupConversationMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupConversationMember to fetch.
     */
    where?: GroupConversationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConversationMembers to fetch.
     */
    orderBy?: GroupConversationMemberOrderByWithRelationInput | GroupConversationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupConversationMembers.
     */
    cursor?: GroupConversationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConversationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConversationMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupConversationMembers.
     */
    distinct?: GroupConversationMemberScalarFieldEnum | GroupConversationMemberScalarFieldEnum[]
  }

  /**
   * GroupConversationMember findMany
   */
  export type GroupConversationMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupConversationMembers to fetch.
     */
    where?: GroupConversationMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConversationMembers to fetch.
     */
    orderBy?: GroupConversationMemberOrderByWithRelationInput | GroupConversationMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupConversationMembers.
     */
    cursor?: GroupConversationMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConversationMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConversationMembers.
     */
    skip?: number
    distinct?: GroupConversationMemberScalarFieldEnum | GroupConversationMemberScalarFieldEnum[]
  }

  /**
   * GroupConversationMember create
   */
  export type GroupConversationMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupConversationMember.
     */
    data: XOR<GroupConversationMemberCreateInput, GroupConversationMemberUncheckedCreateInput>
  }

  /**
   * GroupConversationMember createMany
   */
  export type GroupConversationMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupConversationMembers.
     */
    data: GroupConversationMemberCreateManyInput | GroupConversationMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupConversationMember createManyAndReturn
   */
  export type GroupConversationMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * The data used to create many GroupConversationMembers.
     */
    data: GroupConversationMemberCreateManyInput | GroupConversationMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupConversationMember update
   */
  export type GroupConversationMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupConversationMember.
     */
    data: XOR<GroupConversationMemberUpdateInput, GroupConversationMemberUncheckedUpdateInput>
    /**
     * Choose, which GroupConversationMember to update.
     */
    where: GroupConversationMemberWhereUniqueInput
  }

  /**
   * GroupConversationMember updateMany
   */
  export type GroupConversationMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupConversationMembers.
     */
    data: XOR<GroupConversationMemberUpdateManyMutationInput, GroupConversationMemberUncheckedUpdateManyInput>
    /**
     * Filter which GroupConversationMembers to update
     */
    where?: GroupConversationMemberWhereInput
    /**
     * Limit how many GroupConversationMembers to update.
     */
    limit?: number
  }

  /**
   * GroupConversationMember updateManyAndReturn
   */
  export type GroupConversationMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * The data used to update GroupConversationMembers.
     */
    data: XOR<GroupConversationMemberUpdateManyMutationInput, GroupConversationMemberUncheckedUpdateManyInput>
    /**
     * Filter which GroupConversationMembers to update
     */
    where?: GroupConversationMemberWhereInput
    /**
     * Limit how many GroupConversationMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupConversationMember upsert
   */
  export type GroupConversationMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupConversationMember to update in case it exists.
     */
    where: GroupConversationMemberWhereUniqueInput
    /**
     * In case the GroupConversationMember found by the `where` argument doesn't exist, create a new GroupConversationMember with this data.
     */
    create: XOR<GroupConversationMemberCreateInput, GroupConversationMemberUncheckedCreateInput>
    /**
     * In case the GroupConversationMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupConversationMemberUpdateInput, GroupConversationMemberUncheckedUpdateInput>
  }

  /**
   * GroupConversationMember delete
   */
  export type GroupConversationMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
    /**
     * Filter which GroupConversationMember to delete.
     */
    where: GroupConversationMemberWhereUniqueInput
  }

  /**
   * GroupConversationMember deleteMany
   */
  export type GroupConversationMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupConversationMembers to delete
     */
    where?: GroupConversationMemberWhereInput
    /**
     * Limit how many GroupConversationMembers to delete.
     */
    limit?: number
  }

  /**
   * GroupConversationMember without action
   */
  export type GroupConversationMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConversationMember
     */
    select?: GroupConversationMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConversationMember
     */
    omit?: GroupConversationMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConversationMemberInclude<ExtArgs> | null
  }


  /**
   * Model GroupMessage
   */

  export type AggregateGroupMessage = {
    _count: GroupMessageCountAggregateOutputType | null
    _min: GroupMessageMinAggregateOutputType | null
    _max: GroupMessageMaxAggregateOutputType | null
  }

  export type GroupMessageMinAggregateOutputType = {
    id: string | null
    content: string | null
    fileUrl: string | null
    deleted: boolean | null
    memberId: string | null
    groupConversationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupMessageMaxAggregateOutputType = {
    id: string | null
    content: string | null
    fileUrl: string | null
    deleted: boolean | null
    memberId: string | null
    groupConversationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupMessageCountAggregateOutputType = {
    id: number
    content: number
    fileUrl: number
    deleted: number
    memberId: number
    groupConversationId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupMessageMinAggregateInputType = {
    id?: true
    content?: true
    fileUrl?: true
    deleted?: true
    memberId?: true
    groupConversationId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupMessageMaxAggregateInputType = {
    id?: true
    content?: true
    fileUrl?: true
    deleted?: true
    memberId?: true
    groupConversationId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupMessageCountAggregateInputType = {
    id?: true
    content?: true
    fileUrl?: true
    deleted?: true
    memberId?: true
    groupConversationId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMessage to aggregate.
     */
    where?: GroupMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMessages to fetch.
     */
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupMessages
    **/
    _count?: true | GroupMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMessageMaxAggregateInputType
  }

  export type GetGroupMessageAggregateType<T extends GroupMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupMessage[P]>
      : GetScalarType<T[P], AggregateGroupMessage[P]>
  }




  export type GroupMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMessageWhereInput
    orderBy?: GroupMessageOrderByWithAggregationInput | GroupMessageOrderByWithAggregationInput[]
    by: GroupMessageScalarFieldEnum[] | GroupMessageScalarFieldEnum
    having?: GroupMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupMessageCountAggregateInputType | true
    _min?: GroupMessageMinAggregateInputType
    _max?: GroupMessageMaxAggregateInputType
  }

  export type GroupMessageGroupByOutputType = {
    id: string
    content: string
    fileUrl: string | null
    deleted: boolean
    memberId: string
    groupConversationId: string
    createdAt: Date
    updatedAt: Date
    _count: GroupMessageCountAggregateOutputType | null
    _min: GroupMessageMinAggregateOutputType | null
    _max: GroupMessageMaxAggregateOutputType | null
  }

  type GetGroupMessageGroupByPayload<T extends GroupMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupMessageGroupByOutputType[P]>
            : GetScalarType<T[P], GroupMessageGroupByOutputType[P]>
        }
      >
    >


  export type GroupMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    fileUrl?: boolean
    deleted?: boolean
    memberId?: boolean
    groupConversationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMessage"]>

  export type GroupMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    fileUrl?: boolean
    deleted?: boolean
    memberId?: boolean
    groupConversationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMessage"]>

  export type GroupMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    fileUrl?: boolean
    deleted?: boolean
    memberId?: boolean
    groupConversationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMessage"]>

  export type GroupMessageSelectScalar = {
    id?: boolean
    content?: boolean
    fileUrl?: boolean
    deleted?: boolean
    memberId?: boolean
    groupConversationId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GroupMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "fileUrl" | "deleted" | "memberId" | "groupConversationId" | "createdAt" | "updatedAt", ExtArgs["result"]["groupMessage"]>
  export type GroupMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }
  export type GroupMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }
  export type GroupMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    groupConversation?: boolean | GroupConversationDefaultArgs<ExtArgs>
  }

  export type $GroupMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupMessage"
    objects: {
      member: Prisma.$MemberPayload<ExtArgs>
      groupConversation: Prisma.$GroupConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      fileUrl: string | null
      deleted: boolean
      memberId: string
      groupConversationId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["groupMessage"]>
    composites: {}
  }

  type GroupMessageGetPayload<S extends boolean | null | undefined | GroupMessageDefaultArgs> = $Result.GetResult<Prisma.$GroupMessagePayload, S>

  type GroupMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupMessageCountAggregateInputType | true
    }

  export interface GroupMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupMessage'], meta: { name: 'GroupMessage' } }
    /**
     * Find zero or one GroupMessage that matches the filter.
     * @param {GroupMessageFindUniqueArgs} args - Arguments to find a GroupMessage
     * @example
     * // Get one GroupMessage
     * const groupMessage = await prisma.groupMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupMessageFindUniqueArgs>(args: SelectSubset<T, GroupMessageFindUniqueArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupMessageFindUniqueOrThrowArgs} args - Arguments to find a GroupMessage
     * @example
     * // Get one GroupMessage
     * const groupMessage = await prisma.groupMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageFindFirstArgs} args - Arguments to find a GroupMessage
     * @example
     * // Get one GroupMessage
     * const groupMessage = await prisma.groupMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupMessageFindFirstArgs>(args?: SelectSubset<T, GroupMessageFindFirstArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageFindFirstOrThrowArgs} args - Arguments to find a GroupMessage
     * @example
     * // Get one GroupMessage
     * const groupMessage = await prisma.groupMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupMessages
     * const groupMessages = await prisma.groupMessage.findMany()
     * 
     * // Get first 10 GroupMessages
     * const groupMessages = await prisma.groupMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupMessageWithIdOnly = await prisma.groupMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupMessageFindManyArgs>(args?: SelectSubset<T, GroupMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupMessage.
     * @param {GroupMessageCreateArgs} args - Arguments to create a GroupMessage.
     * @example
     * // Create one GroupMessage
     * const GroupMessage = await prisma.groupMessage.create({
     *   data: {
     *     // ... data to create a GroupMessage
     *   }
     * })
     * 
     */
    create<T extends GroupMessageCreateArgs>(args: SelectSubset<T, GroupMessageCreateArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupMessages.
     * @param {GroupMessageCreateManyArgs} args - Arguments to create many GroupMessages.
     * @example
     * // Create many GroupMessages
     * const groupMessage = await prisma.groupMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupMessageCreateManyArgs>(args?: SelectSubset<T, GroupMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupMessages and returns the data saved in the database.
     * @param {GroupMessageCreateManyAndReturnArgs} args - Arguments to create many GroupMessages.
     * @example
     * // Create many GroupMessages
     * const groupMessage = await prisma.groupMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupMessages and only return the `id`
     * const groupMessageWithIdOnly = await prisma.groupMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupMessage.
     * @param {GroupMessageDeleteArgs} args - Arguments to delete one GroupMessage.
     * @example
     * // Delete one GroupMessage
     * const GroupMessage = await prisma.groupMessage.delete({
     *   where: {
     *     // ... filter to delete one GroupMessage
     *   }
     * })
     * 
     */
    delete<T extends GroupMessageDeleteArgs>(args: SelectSubset<T, GroupMessageDeleteArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupMessage.
     * @param {GroupMessageUpdateArgs} args - Arguments to update one GroupMessage.
     * @example
     * // Update one GroupMessage
     * const groupMessage = await prisma.groupMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupMessageUpdateArgs>(args: SelectSubset<T, GroupMessageUpdateArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupMessages.
     * @param {GroupMessageDeleteManyArgs} args - Arguments to filter GroupMessages to delete.
     * @example
     * // Delete a few GroupMessages
     * const { count } = await prisma.groupMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupMessageDeleteManyArgs>(args?: SelectSubset<T, GroupMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupMessages
     * const groupMessage = await prisma.groupMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupMessageUpdateManyArgs>(args: SelectSubset<T, GroupMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupMessages and returns the data updated in the database.
     * @param {GroupMessageUpdateManyAndReturnArgs} args - Arguments to update many GroupMessages.
     * @example
     * // Update many GroupMessages
     * const groupMessage = await prisma.groupMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupMessages and only return the `id`
     * const groupMessageWithIdOnly = await prisma.groupMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupMessage.
     * @param {GroupMessageUpsertArgs} args - Arguments to update or create a GroupMessage.
     * @example
     * // Update or create a GroupMessage
     * const groupMessage = await prisma.groupMessage.upsert({
     *   create: {
     *     // ... data to create a GroupMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupMessage we want to update
     *   }
     * })
     */
    upsert<T extends GroupMessageUpsertArgs>(args: SelectSubset<T, GroupMessageUpsertArgs<ExtArgs>>): Prisma__GroupMessageClient<$Result.GetResult<Prisma.$GroupMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageCountArgs} args - Arguments to filter GroupMessages to count.
     * @example
     * // Count the number of GroupMessages
     * const count = await prisma.groupMessage.count({
     *   where: {
     *     // ... the filter for the GroupMessages we want to count
     *   }
     * })
    **/
    count<T extends GroupMessageCountArgs>(
      args?: Subset<T, GroupMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupMessageAggregateArgs>(args: Subset<T, GroupMessageAggregateArgs>): Prisma.PrismaPromise<GetGroupMessageAggregateType<T>>

    /**
     * Group by GroupMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupMessageGroupByArgs['orderBy'] }
        : { orderBy?: GroupMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupMessage model
   */
  readonly fields: GroupMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    groupConversation<T extends GroupConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupConversationDefaultArgs<ExtArgs>>): Prisma__GroupConversationClient<$Result.GetResult<Prisma.$GroupConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupMessage model
   */
  interface GroupMessageFieldRefs {
    readonly id: FieldRef<"GroupMessage", 'String'>
    readonly content: FieldRef<"GroupMessage", 'String'>
    readonly fileUrl: FieldRef<"GroupMessage", 'String'>
    readonly deleted: FieldRef<"GroupMessage", 'Boolean'>
    readonly memberId: FieldRef<"GroupMessage", 'String'>
    readonly groupConversationId: FieldRef<"GroupMessage", 'String'>
    readonly createdAt: FieldRef<"GroupMessage", 'DateTime'>
    readonly updatedAt: FieldRef<"GroupMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GroupMessage findUnique
   */
  export type GroupMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter, which GroupMessage to fetch.
     */
    where: GroupMessageWhereUniqueInput
  }

  /**
   * GroupMessage findUniqueOrThrow
   */
  export type GroupMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter, which GroupMessage to fetch.
     */
    where: GroupMessageWhereUniqueInput
  }

  /**
   * GroupMessage findFirst
   */
  export type GroupMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter, which GroupMessage to fetch.
     */
    where?: GroupMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMessages to fetch.
     */
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMessages.
     */
    cursor?: GroupMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMessages.
     */
    distinct?: GroupMessageScalarFieldEnum | GroupMessageScalarFieldEnum[]
  }

  /**
   * GroupMessage findFirstOrThrow
   */
  export type GroupMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter, which GroupMessage to fetch.
     */
    where?: GroupMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMessages to fetch.
     */
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMessages.
     */
    cursor?: GroupMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMessages.
     */
    distinct?: GroupMessageScalarFieldEnum | GroupMessageScalarFieldEnum[]
  }

  /**
   * GroupMessage findMany
   */
  export type GroupMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter, which GroupMessages to fetch.
     */
    where?: GroupMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMessages to fetch.
     */
    orderBy?: GroupMessageOrderByWithRelationInput | GroupMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupMessages.
     */
    cursor?: GroupMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMessages.
     */
    skip?: number
    distinct?: GroupMessageScalarFieldEnum | GroupMessageScalarFieldEnum[]
  }

  /**
   * GroupMessage create
   */
  export type GroupMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupMessage.
     */
    data: XOR<GroupMessageCreateInput, GroupMessageUncheckedCreateInput>
  }

  /**
   * GroupMessage createMany
   */
  export type GroupMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupMessages.
     */
    data: GroupMessageCreateManyInput | GroupMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupMessage createManyAndReturn
   */
  export type GroupMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * The data used to create many GroupMessages.
     */
    data: GroupMessageCreateManyInput | GroupMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupMessage update
   */
  export type GroupMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupMessage.
     */
    data: XOR<GroupMessageUpdateInput, GroupMessageUncheckedUpdateInput>
    /**
     * Choose, which GroupMessage to update.
     */
    where: GroupMessageWhereUniqueInput
  }

  /**
   * GroupMessage updateMany
   */
  export type GroupMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupMessages.
     */
    data: XOR<GroupMessageUpdateManyMutationInput, GroupMessageUncheckedUpdateManyInput>
    /**
     * Filter which GroupMessages to update
     */
    where?: GroupMessageWhereInput
    /**
     * Limit how many GroupMessages to update.
     */
    limit?: number
  }

  /**
   * GroupMessage updateManyAndReturn
   */
  export type GroupMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * The data used to update GroupMessages.
     */
    data: XOR<GroupMessageUpdateManyMutationInput, GroupMessageUncheckedUpdateManyInput>
    /**
     * Filter which GroupMessages to update
     */
    where?: GroupMessageWhereInput
    /**
     * Limit how many GroupMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupMessage upsert
   */
  export type GroupMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupMessage to update in case it exists.
     */
    where: GroupMessageWhereUniqueInput
    /**
     * In case the GroupMessage found by the `where` argument doesn't exist, create a new GroupMessage with this data.
     */
    create: XOR<GroupMessageCreateInput, GroupMessageUncheckedCreateInput>
    /**
     * In case the GroupMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupMessageUpdateInput, GroupMessageUncheckedUpdateInput>
  }

  /**
   * GroupMessage delete
   */
  export type GroupMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
    /**
     * Filter which GroupMessage to delete.
     */
    where: GroupMessageWhereUniqueInput
  }

  /**
   * GroupMessage deleteMany
   */
  export type GroupMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMessages to delete
     */
    where?: GroupMessageWhereInput
    /**
     * Limit how many GroupMessages to delete.
     */
    limit?: number
  }

  /**
   * GroupMessage without action
   */
  export type GroupMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMessage
     */
    select?: GroupMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMessage
     */
    omit?: GroupMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMessageInclude<ExtArgs> | null
  }


  /**
   * Model FriendRequest
   */

  export type AggregateFriendRequest = {
    _count: FriendRequestCountAggregateOutputType | null
    _min: FriendRequestMinAggregateOutputType | null
    _max: FriendRequestMaxAggregateOutputType | null
  }

  export type FriendRequestMinAggregateOutputType = {
    id: string | null
    requesterProfileId: string | null
    targetProfileId: string | null
    status: $Enums.FriendRequestStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendRequestMaxAggregateOutputType = {
    id: string | null
    requesterProfileId: string | null
    targetProfileId: string | null
    status: $Enums.FriendRequestStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendRequestCountAggregateOutputType = {
    id: number
    requesterProfileId: number
    targetProfileId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FriendRequestMinAggregateInputType = {
    id?: true
    requesterProfileId?: true
    targetProfileId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendRequestMaxAggregateInputType = {
    id?: true
    requesterProfileId?: true
    targetProfileId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendRequestCountAggregateInputType = {
    id?: true
    requesterProfileId?: true
    targetProfileId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FriendRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendRequest to aggregate.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FriendRequests
    **/
    _count?: true | FriendRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendRequestMaxAggregateInputType
  }

  export type GetFriendRequestAggregateType<T extends FriendRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateFriendRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendRequest[P]>
      : GetScalarType<T[P], AggregateFriendRequest[P]>
  }




  export type FriendRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendRequestWhereInput
    orderBy?: FriendRequestOrderByWithAggregationInput | FriendRequestOrderByWithAggregationInput[]
    by: FriendRequestScalarFieldEnum[] | FriendRequestScalarFieldEnum
    having?: FriendRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendRequestCountAggregateInputType | true
    _min?: FriendRequestMinAggregateInputType
    _max?: FriendRequestMaxAggregateInputType
  }

  export type FriendRequestGroupByOutputType = {
    id: string
    requesterProfileId: string
    targetProfileId: string
    status: $Enums.FriendRequestStatus
    createdAt: Date
    updatedAt: Date
    _count: FriendRequestCountAggregateOutputType | null
    _min: FriendRequestMinAggregateOutputType | null
    _max: FriendRequestMaxAggregateOutputType | null
  }

  type GetFriendRequestGroupByPayload<T extends FriendRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendRequestGroupByOutputType[P]>
            : GetScalarType<T[P], FriendRequestGroupByOutputType[P]>
        }
      >
    >


  export type FriendRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterProfileId?: boolean
    targetProfileId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requesterProfile?: boolean | ProfileDefaultArgs<ExtArgs>
    targetProfile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendRequest"]>

  export type FriendRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterProfileId?: boolean
    targetProfileId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requesterProfile?: boolean | ProfileDefaultArgs<ExtArgs>
    targetProfile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendRequest"]>

  export type FriendRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterProfileId?: boolean
    targetProfileId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requesterProfile?: boolean | ProfileDefaultArgs<ExtArgs>
    targetProfile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendRequest"]>

  export type FriendRequestSelectScalar = {
    id?: boolean
    requesterProfileId?: boolean
    targetProfileId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FriendRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "requesterProfileId" | "targetProfileId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["friendRequest"]>
  export type FriendRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requesterProfile?: boolean | ProfileDefaultArgs<ExtArgs>
    targetProfile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type FriendRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requesterProfile?: boolean | ProfileDefaultArgs<ExtArgs>
    targetProfile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type FriendRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requesterProfile?: boolean | ProfileDefaultArgs<ExtArgs>
    targetProfile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $FriendRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FriendRequest"
    objects: {
      requesterProfile: Prisma.$ProfilePayload<ExtArgs>
      targetProfile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requesterProfileId: string
      targetProfileId: string
      status: $Enums.FriendRequestStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["friendRequest"]>
    composites: {}
  }

  type FriendRequestGetPayload<S extends boolean | null | undefined | FriendRequestDefaultArgs> = $Result.GetResult<Prisma.$FriendRequestPayload, S>

  type FriendRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendRequestCountAggregateInputType | true
    }

  export interface FriendRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FriendRequest'], meta: { name: 'FriendRequest' } }
    /**
     * Find zero or one FriendRequest that matches the filter.
     * @param {FriendRequestFindUniqueArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendRequestFindUniqueArgs>(args: SelectSubset<T, FriendRequestFindUniqueArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FriendRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendRequestFindUniqueOrThrowArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindFirstArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendRequestFindFirstArgs>(args?: SelectSubset<T, FriendRequestFindFirstArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindFirstOrThrowArgs} args - Arguments to find a FriendRequest
     * @example
     * // Get one FriendRequest
     * const friendRequest = await prisma.friendRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FriendRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FriendRequests
     * const friendRequests = await prisma.friendRequest.findMany()
     * 
     * // Get first 10 FriendRequests
     * const friendRequests = await prisma.friendRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendRequestWithIdOnly = await prisma.friendRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendRequestFindManyArgs>(args?: SelectSubset<T, FriendRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FriendRequest.
     * @param {FriendRequestCreateArgs} args - Arguments to create a FriendRequest.
     * @example
     * // Create one FriendRequest
     * const FriendRequest = await prisma.friendRequest.create({
     *   data: {
     *     // ... data to create a FriendRequest
     *   }
     * })
     * 
     */
    create<T extends FriendRequestCreateArgs>(args: SelectSubset<T, FriendRequestCreateArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FriendRequests.
     * @param {FriendRequestCreateManyArgs} args - Arguments to create many FriendRequests.
     * @example
     * // Create many FriendRequests
     * const friendRequest = await prisma.friendRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendRequestCreateManyArgs>(args?: SelectSubset<T, FriendRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FriendRequests and returns the data saved in the database.
     * @param {FriendRequestCreateManyAndReturnArgs} args - Arguments to create many FriendRequests.
     * @example
     * // Create many FriendRequests
     * const friendRequest = await prisma.friendRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FriendRequests and only return the `id`
     * const friendRequestWithIdOnly = await prisma.friendRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FriendRequest.
     * @param {FriendRequestDeleteArgs} args - Arguments to delete one FriendRequest.
     * @example
     * // Delete one FriendRequest
     * const FriendRequest = await prisma.friendRequest.delete({
     *   where: {
     *     // ... filter to delete one FriendRequest
     *   }
     * })
     * 
     */
    delete<T extends FriendRequestDeleteArgs>(args: SelectSubset<T, FriendRequestDeleteArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FriendRequest.
     * @param {FriendRequestUpdateArgs} args - Arguments to update one FriendRequest.
     * @example
     * // Update one FriendRequest
     * const friendRequest = await prisma.friendRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendRequestUpdateArgs>(args: SelectSubset<T, FriendRequestUpdateArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FriendRequests.
     * @param {FriendRequestDeleteManyArgs} args - Arguments to filter FriendRequests to delete.
     * @example
     * // Delete a few FriendRequests
     * const { count } = await prisma.friendRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendRequestDeleteManyArgs>(args?: SelectSubset<T, FriendRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FriendRequests
     * const friendRequest = await prisma.friendRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendRequestUpdateManyArgs>(args: SelectSubset<T, FriendRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendRequests and returns the data updated in the database.
     * @param {FriendRequestUpdateManyAndReturnArgs} args - Arguments to update many FriendRequests.
     * @example
     * // Update many FriendRequests
     * const friendRequest = await prisma.friendRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FriendRequests and only return the `id`
     * const friendRequestWithIdOnly = await prisma.friendRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FriendRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, FriendRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FriendRequest.
     * @param {FriendRequestUpsertArgs} args - Arguments to update or create a FriendRequest.
     * @example
     * // Update or create a FriendRequest
     * const friendRequest = await prisma.friendRequest.upsert({
     *   create: {
     *     // ... data to create a FriendRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FriendRequest we want to update
     *   }
     * })
     */
    upsert<T extends FriendRequestUpsertArgs>(args: SelectSubset<T, FriendRequestUpsertArgs<ExtArgs>>): Prisma__FriendRequestClient<$Result.GetResult<Prisma.$FriendRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FriendRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestCountArgs} args - Arguments to filter FriendRequests to count.
     * @example
     * // Count the number of FriendRequests
     * const count = await prisma.friendRequest.count({
     *   where: {
     *     // ... the filter for the FriendRequests we want to count
     *   }
     * })
    **/
    count<T extends FriendRequestCountArgs>(
      args?: Subset<T, FriendRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FriendRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendRequestAggregateArgs>(args: Subset<T, FriendRequestAggregateArgs>): Prisma.PrismaPromise<GetFriendRequestAggregateType<T>>

    /**
     * Group by FriendRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FriendRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendRequestGroupByArgs['orderBy'] }
        : { orderBy?: FriendRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FriendRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FriendRequest model
   */
  readonly fields: FriendRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FriendRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requesterProfile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    targetProfile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FriendRequest model
   */
  interface FriendRequestFieldRefs {
    readonly id: FieldRef<"FriendRequest", 'String'>
    readonly requesterProfileId: FieldRef<"FriendRequest", 'String'>
    readonly targetProfileId: FieldRef<"FriendRequest", 'String'>
    readonly status: FieldRef<"FriendRequest", 'FriendRequestStatus'>
    readonly createdAt: FieldRef<"FriendRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"FriendRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FriendRequest findUnique
   */
  export type FriendRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest findUniqueOrThrow
   */
  export type FriendRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest findFirst
   */
  export type FriendRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendRequests.
     */
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest findFirstOrThrow
   */
  export type FriendRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequest to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendRequests.
     */
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest findMany
   */
  export type FriendRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter, which FriendRequests to fetch.
     */
    where?: FriendRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendRequests to fetch.
     */
    orderBy?: FriendRequestOrderByWithRelationInput | FriendRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FriendRequests.
     */
    cursor?: FriendRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendRequests.
     */
    skip?: number
    distinct?: FriendRequestScalarFieldEnum | FriendRequestScalarFieldEnum[]
  }

  /**
   * FriendRequest create
   */
  export type FriendRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a FriendRequest.
     */
    data: XOR<FriendRequestCreateInput, FriendRequestUncheckedCreateInput>
  }

  /**
   * FriendRequest createMany
   */
  export type FriendRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FriendRequests.
     */
    data: FriendRequestCreateManyInput | FriendRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FriendRequest createManyAndReturn
   */
  export type FriendRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * The data used to create many FriendRequests.
     */
    data: FriendRequestCreateManyInput | FriendRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FriendRequest update
   */
  export type FriendRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a FriendRequest.
     */
    data: XOR<FriendRequestUpdateInput, FriendRequestUncheckedUpdateInput>
    /**
     * Choose, which FriendRequest to update.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest updateMany
   */
  export type FriendRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FriendRequests.
     */
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyInput>
    /**
     * Filter which FriendRequests to update
     */
    where?: FriendRequestWhereInput
    /**
     * Limit how many FriendRequests to update.
     */
    limit?: number
  }

  /**
   * FriendRequest updateManyAndReturn
   */
  export type FriendRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * The data used to update FriendRequests.
     */
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyInput>
    /**
     * Filter which FriendRequests to update
     */
    where?: FriendRequestWhereInput
    /**
     * Limit how many FriendRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FriendRequest upsert
   */
  export type FriendRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the FriendRequest to update in case it exists.
     */
    where: FriendRequestWhereUniqueInput
    /**
     * In case the FriendRequest found by the `where` argument doesn't exist, create a new FriendRequest with this data.
     */
    create: XOR<FriendRequestCreateInput, FriendRequestUncheckedCreateInput>
    /**
     * In case the FriendRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendRequestUpdateInput, FriendRequestUncheckedUpdateInput>
  }

  /**
   * FriendRequest delete
   */
  export type FriendRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
    /**
     * Filter which FriendRequest to delete.
     */
    where: FriendRequestWhereUniqueInput
  }

  /**
   * FriendRequest deleteMany
   */
  export type FriendRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendRequests to delete
     */
    where?: FriendRequestWhereInput
    /**
     * Limit how many FriendRequests to delete.
     */
    limit?: number
  }

  /**
   * FriendRequest without action
   */
  export type FriendRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendRequest
     */
    select?: FriendRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendRequest
     */
    omit?: FriendRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendRequestInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    imageUrl: 'imageUrl',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const ServerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    imageUrl: 'imageUrl',
    inviteCode: 'inviteCode',
    profileId: 'profileId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServerScalarFieldEnum = (typeof ServerScalarFieldEnum)[keyof typeof ServerScalarFieldEnum]


  export const MemberScalarFieldEnum: {
    id: 'id',
    role: 'role',
    profileId: 'profileId',
    serverId: 'serverId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum]


  export const ChannelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    profileId: 'profileId',
    serverId: 'serverId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChannelScalarFieldEnum = (typeof ChannelScalarFieldEnum)[keyof typeof ChannelScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    memberOneId: 'memberOneId',
    memberTwoId: 'memberTwoId',
    profileId: 'profileId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const GroupConversationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    imageUrl: 'imageUrl',
    profileId: 'profileId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupConversationScalarFieldEnum = (typeof GroupConversationScalarFieldEnum)[keyof typeof GroupConversationScalarFieldEnum]


  export const GroupConversationMemberScalarFieldEnum: {
    id: 'id',
    role: 'role',
    profileId: 'profileId',
    memberId: 'memberId',
    groupConversationId: 'groupConversationId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupConversationMemberScalarFieldEnum = (typeof GroupConversationMemberScalarFieldEnum)[keyof typeof GroupConversationMemberScalarFieldEnum]


  export const GroupMessageScalarFieldEnum: {
    id: 'id',
    content: 'content',
    fileUrl: 'fileUrl',
    deleted: 'deleted',
    memberId: 'memberId',
    groupConversationId: 'groupConversationId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupMessageScalarFieldEnum = (typeof GroupMessageScalarFieldEnum)[keyof typeof GroupMessageScalarFieldEnum]


  export const FriendRequestScalarFieldEnum: {
    id: 'id',
    requesterProfileId: 'requesterProfileId',
    targetProfileId: 'targetProfileId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FriendRequestScalarFieldEnum = (typeof FriendRequestScalarFieldEnum)[keyof typeof FriendRequestScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'MemberRole'
   */
  export type EnumMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberRole'>
    


  /**
   * Reference to a field of type 'MemberRole[]'
   */
  export type ListEnumMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberRole[]'>
    


  /**
   * Reference to a field of type 'ChannelType'
   */
  export type EnumChannelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChannelType'>
    


  /**
   * Reference to a field of type 'ChannelType[]'
   */
  export type ListEnumChannelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChannelType[]'>
    


  /**
   * Reference to a field of type 'GroupMemberRole'
   */
  export type EnumGroupMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GroupMemberRole'>
    


  /**
   * Reference to a field of type 'GroupMemberRole[]'
   */
  export type ListEnumGroupMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GroupMemberRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'FriendRequestStatus'
   */
  export type EnumFriendRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FriendRequestStatus'>
    


  /**
   * Reference to a field of type 'FriendRequestStatus[]'
   */
  export type ListEnumFriendRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FriendRequestStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    name?: StringFilter<"Profile"> | string
    imageUrl?: StringFilter<"Profile"> | string
    email?: StringFilter<"Profile"> | string
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    servers?: ServerListRelationFilter
    members?: MemberListRelationFilter
    channels?: ChannelListRelationFilter
    conversations?: ConversationListRelationFilter
    groupConversations?: GroupConversationMemberListRelationFilter
    groupConversationsCreated?: GroupConversationListRelationFilter
    friendRequestsSent?: FriendRequestListRelationFilter
    friendRequestsReceived?: FriendRequestListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    servers?: ServerOrderByRelationAggregateInput
    members?: MemberOrderByRelationAggregateInput
    channels?: ChannelOrderByRelationAggregateInput
    conversations?: ConversationOrderByRelationAggregateInput
    groupConversations?: GroupConversationMemberOrderByRelationAggregateInput
    groupConversationsCreated?: GroupConversationOrderByRelationAggregateInput
    friendRequestsSent?: FriendRequestOrderByRelationAggregateInput
    friendRequestsReceived?: FriendRequestOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    name?: StringFilter<"Profile"> | string
    imageUrl?: StringFilter<"Profile"> | string
    email?: StringFilter<"Profile"> | string
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    servers?: ServerListRelationFilter
    members?: MemberListRelationFilter
    channels?: ChannelListRelationFilter
    conversations?: ConversationListRelationFilter
    groupConversations?: GroupConversationMemberListRelationFilter
    groupConversationsCreated?: GroupConversationListRelationFilter
    friendRequestsSent?: FriendRequestListRelationFilter
    friendRequestsReceived?: FriendRequestListRelationFilter
  }, "id" | "userId">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    userId?: StringWithAggregatesFilter<"Profile"> | string
    name?: StringWithAggregatesFilter<"Profile"> | string
    imageUrl?: StringWithAggregatesFilter<"Profile"> | string
    email?: StringWithAggregatesFilter<"Profile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type ServerWhereInput = {
    AND?: ServerWhereInput | ServerWhereInput[]
    OR?: ServerWhereInput[]
    NOT?: ServerWhereInput | ServerWhereInput[]
    id?: StringFilter<"Server"> | string
    name?: StringFilter<"Server"> | string
    imageUrl?: StringFilter<"Server"> | string
    inviteCode?: StringFilter<"Server"> | string
    profileId?: StringFilter<"Server"> | string
    createdAt?: DateTimeFilter<"Server"> | Date | string
    updatedAt?: DateTimeFilter<"Server"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    members?: MemberListRelationFilter
    channels?: ChannelListRelationFilter
  }

  export type ServerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    inviteCode?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    members?: MemberOrderByRelationAggregateInput
    channels?: ChannelOrderByRelationAggregateInput
  }

  export type ServerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inviteCode?: string
    AND?: ServerWhereInput | ServerWhereInput[]
    OR?: ServerWhereInput[]
    NOT?: ServerWhereInput | ServerWhereInput[]
    name?: StringFilter<"Server"> | string
    imageUrl?: StringFilter<"Server"> | string
    profileId?: StringFilter<"Server"> | string
    createdAt?: DateTimeFilter<"Server"> | Date | string
    updatedAt?: DateTimeFilter<"Server"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    members?: MemberListRelationFilter
    channels?: ChannelListRelationFilter
  }, "id" | "inviteCode">

  export type ServerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    inviteCode?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServerCountOrderByAggregateInput
    _max?: ServerMaxOrderByAggregateInput
    _min?: ServerMinOrderByAggregateInput
  }

  export type ServerScalarWhereWithAggregatesInput = {
    AND?: ServerScalarWhereWithAggregatesInput | ServerScalarWhereWithAggregatesInput[]
    OR?: ServerScalarWhereWithAggregatesInput[]
    NOT?: ServerScalarWhereWithAggregatesInput | ServerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Server"> | string
    name?: StringWithAggregatesFilter<"Server"> | string
    imageUrl?: StringWithAggregatesFilter<"Server"> | string
    inviteCode?: StringWithAggregatesFilter<"Server"> | string
    profileId?: StringWithAggregatesFilter<"Server"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Server"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Server"> | Date | string
  }

  export type MemberWhereInput = {
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    id?: StringFilter<"Member"> | string
    role?: EnumMemberRoleFilter<"Member"> | $Enums.MemberRole
    profileId?: StringFilter<"Member"> | string
    serverId?: StringFilter<"Member"> | string
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    conversationsInitiated?: ConversationListRelationFilter
    conversationsReceived?: ConversationListRelationFilter
    groupConversations?: GroupConversationMemberListRelationFilter
    groupMessages?: GroupMessageListRelationFilter
  }

  export type MemberOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    profileId?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    server?: ServerOrderByWithRelationInput
    conversationsInitiated?: ConversationOrderByRelationAggregateInput
    conversationsReceived?: ConversationOrderByRelationAggregateInput
    groupConversations?: GroupConversationMemberOrderByRelationAggregateInput
    groupMessages?: GroupMessageOrderByRelationAggregateInput
  }

  export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    profileId_serverId?: MemberProfileIdServerIdCompoundUniqueInput
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    role?: EnumMemberRoleFilter<"Member"> | $Enums.MemberRole
    profileId?: StringFilter<"Member"> | string
    serverId?: StringFilter<"Member"> | string
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
    conversationsInitiated?: ConversationListRelationFilter
    conversationsReceived?: ConversationListRelationFilter
    groupConversations?: GroupConversationMemberListRelationFilter
    groupMessages?: GroupMessageListRelationFilter
  }, "id" | "profileId_serverId">

  export type MemberOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    profileId?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberCountOrderByAggregateInput
    _max?: MemberMaxOrderByAggregateInput
    _min?: MemberMinOrderByAggregateInput
  }

  export type MemberScalarWhereWithAggregatesInput = {
    AND?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    OR?: MemberScalarWhereWithAggregatesInput[]
    NOT?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Member"> | string
    role?: EnumMemberRoleWithAggregatesFilter<"Member"> | $Enums.MemberRole
    profileId?: StringWithAggregatesFilter<"Member"> | string
    serverId?: StringWithAggregatesFilter<"Member"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
  }

  export type ChannelWhereInput = {
    AND?: ChannelWhereInput | ChannelWhereInput[]
    OR?: ChannelWhereInput[]
    NOT?: ChannelWhereInput | ChannelWhereInput[]
    id?: StringFilter<"Channel"> | string
    name?: StringFilter<"Channel"> | string
    type?: EnumChannelTypeFilter<"Channel"> | $Enums.ChannelType
    profileId?: StringFilter<"Channel"> | string
    serverId?: StringFilter<"Channel"> | string
    createdAt?: DateTimeFilter<"Channel"> | Date | string
    updatedAt?: DateTimeFilter<"Channel"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
  }

  export type ChannelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    profileId?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    server?: ServerOrderByWithRelationInput
  }

  export type ChannelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChannelWhereInput | ChannelWhereInput[]
    OR?: ChannelWhereInput[]
    NOT?: ChannelWhereInput | ChannelWhereInput[]
    name?: StringFilter<"Channel"> | string
    type?: EnumChannelTypeFilter<"Channel"> | $Enums.ChannelType
    profileId?: StringFilter<"Channel"> | string
    serverId?: StringFilter<"Channel"> | string
    createdAt?: DateTimeFilter<"Channel"> | Date | string
    updatedAt?: DateTimeFilter<"Channel"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    server?: XOR<ServerScalarRelationFilter, ServerWhereInput>
  }, "id">

  export type ChannelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    profileId?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChannelCountOrderByAggregateInput
    _max?: ChannelMaxOrderByAggregateInput
    _min?: ChannelMinOrderByAggregateInput
  }

  export type ChannelScalarWhereWithAggregatesInput = {
    AND?: ChannelScalarWhereWithAggregatesInput | ChannelScalarWhereWithAggregatesInput[]
    OR?: ChannelScalarWhereWithAggregatesInput[]
    NOT?: ChannelScalarWhereWithAggregatesInput | ChannelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Channel"> | string
    name?: StringWithAggregatesFilter<"Channel"> | string
    type?: EnumChannelTypeWithAggregatesFilter<"Channel"> | $Enums.ChannelType
    profileId?: StringWithAggregatesFilter<"Channel"> | string
    serverId?: StringWithAggregatesFilter<"Channel"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Channel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Channel"> | Date | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    memberOneId?: StringFilter<"Conversation"> | string
    memberTwoId?: StringFilter<"Conversation"> | string
    profileId?: StringFilter<"Conversation"> | string
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    memberOne?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    memberTwo?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    memberOneId?: SortOrder
    memberTwoId?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    memberOne?: MemberOrderByWithRelationInput
    memberTwo?: MemberOrderByWithRelationInput
    profile?: ProfileOrderByWithRelationInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    memberOneId_memberTwoId?: ConversationMemberOneIdMemberTwoIdCompoundUniqueInput
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    memberOneId?: StringFilter<"Conversation"> | string
    memberTwoId?: StringFilter<"Conversation"> | string
    profileId?: StringFilter<"Conversation"> | string
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    memberOne?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    memberTwo?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id" | "memberOneId_memberTwoId">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    memberOneId?: SortOrder
    memberTwoId?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    memberOneId?: StringWithAggregatesFilter<"Conversation"> | string
    memberTwoId?: StringWithAggregatesFilter<"Conversation"> | string
    profileId?: StringWithAggregatesFilter<"Conversation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type GroupConversationWhereInput = {
    AND?: GroupConversationWhereInput | GroupConversationWhereInput[]
    OR?: GroupConversationWhereInput[]
    NOT?: GroupConversationWhereInput | GroupConversationWhereInput[]
    id?: StringFilter<"GroupConversation"> | string
    name?: StringFilter<"GroupConversation"> | string
    imageUrl?: StringNullableFilter<"GroupConversation"> | string | null
    profileId?: StringFilter<"GroupConversation"> | string
    createdAt?: DateTimeFilter<"GroupConversation"> | Date | string
    updatedAt?: DateTimeFilter<"GroupConversation"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    members?: GroupConversationMemberListRelationFilter
    messages?: GroupMessageListRelationFilter
  }

  export type GroupConversationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    members?: GroupConversationMemberOrderByRelationAggregateInput
    messages?: GroupMessageOrderByRelationAggregateInput
  }

  export type GroupConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupConversationWhereInput | GroupConversationWhereInput[]
    OR?: GroupConversationWhereInput[]
    NOT?: GroupConversationWhereInput | GroupConversationWhereInput[]
    name?: StringFilter<"GroupConversation"> | string
    imageUrl?: StringNullableFilter<"GroupConversation"> | string | null
    profileId?: StringFilter<"GroupConversation"> | string
    createdAt?: DateTimeFilter<"GroupConversation"> | Date | string
    updatedAt?: DateTimeFilter<"GroupConversation"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    members?: GroupConversationMemberListRelationFilter
    messages?: GroupMessageListRelationFilter
  }, "id">

  export type GroupConversationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupConversationCountOrderByAggregateInput
    _max?: GroupConversationMaxOrderByAggregateInput
    _min?: GroupConversationMinOrderByAggregateInput
  }

  export type GroupConversationScalarWhereWithAggregatesInput = {
    AND?: GroupConversationScalarWhereWithAggregatesInput | GroupConversationScalarWhereWithAggregatesInput[]
    OR?: GroupConversationScalarWhereWithAggregatesInput[]
    NOT?: GroupConversationScalarWhereWithAggregatesInput | GroupConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupConversation"> | string
    name?: StringWithAggregatesFilter<"GroupConversation"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"GroupConversation"> | string | null
    profileId?: StringWithAggregatesFilter<"GroupConversation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GroupConversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GroupConversation"> | Date | string
  }

  export type GroupConversationMemberWhereInput = {
    AND?: GroupConversationMemberWhereInput | GroupConversationMemberWhereInput[]
    OR?: GroupConversationMemberWhereInput[]
    NOT?: GroupConversationMemberWhereInput | GroupConversationMemberWhereInput[]
    id?: StringFilter<"GroupConversationMember"> | string
    role?: EnumGroupMemberRoleFilter<"GroupConversationMember"> | $Enums.GroupMemberRole
    profileId?: StringFilter<"GroupConversationMember"> | string
    memberId?: StringFilter<"GroupConversationMember"> | string
    groupConversationId?: StringFilter<"GroupConversationMember"> | string
    createdAt?: DateTimeFilter<"GroupConversationMember"> | Date | string
    updatedAt?: DateTimeFilter<"GroupConversationMember"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    groupConversation?: XOR<GroupConversationScalarRelationFilter, GroupConversationWhereInput>
  }

  export type GroupConversationMemberOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    profileId?: SortOrder
    memberId?: SortOrder
    groupConversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    member?: MemberOrderByWithRelationInput
    groupConversation?: GroupConversationOrderByWithRelationInput
  }

  export type GroupConversationMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    profileId_groupConversationId?: GroupConversationMemberProfileIdGroupConversationIdCompoundUniqueInput
    AND?: GroupConversationMemberWhereInput | GroupConversationMemberWhereInput[]
    OR?: GroupConversationMemberWhereInput[]
    NOT?: GroupConversationMemberWhereInput | GroupConversationMemberWhereInput[]
    role?: EnumGroupMemberRoleFilter<"GroupConversationMember"> | $Enums.GroupMemberRole
    profileId?: StringFilter<"GroupConversationMember"> | string
    memberId?: StringFilter<"GroupConversationMember"> | string
    groupConversationId?: StringFilter<"GroupConversationMember"> | string
    createdAt?: DateTimeFilter<"GroupConversationMember"> | Date | string
    updatedAt?: DateTimeFilter<"GroupConversationMember"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    groupConversation?: XOR<GroupConversationScalarRelationFilter, GroupConversationWhereInput>
  }, "id" | "profileId_groupConversationId">

  export type GroupConversationMemberOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    profileId?: SortOrder
    memberId?: SortOrder
    groupConversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupConversationMemberCountOrderByAggregateInput
    _max?: GroupConversationMemberMaxOrderByAggregateInput
    _min?: GroupConversationMemberMinOrderByAggregateInput
  }

  export type GroupConversationMemberScalarWhereWithAggregatesInput = {
    AND?: GroupConversationMemberScalarWhereWithAggregatesInput | GroupConversationMemberScalarWhereWithAggregatesInput[]
    OR?: GroupConversationMemberScalarWhereWithAggregatesInput[]
    NOT?: GroupConversationMemberScalarWhereWithAggregatesInput | GroupConversationMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupConversationMember"> | string
    role?: EnumGroupMemberRoleWithAggregatesFilter<"GroupConversationMember"> | $Enums.GroupMemberRole
    profileId?: StringWithAggregatesFilter<"GroupConversationMember"> | string
    memberId?: StringWithAggregatesFilter<"GroupConversationMember"> | string
    groupConversationId?: StringWithAggregatesFilter<"GroupConversationMember"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GroupConversationMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GroupConversationMember"> | Date | string
  }

  export type GroupMessageWhereInput = {
    AND?: GroupMessageWhereInput | GroupMessageWhereInput[]
    OR?: GroupMessageWhereInput[]
    NOT?: GroupMessageWhereInput | GroupMessageWhereInput[]
    id?: StringFilter<"GroupMessage"> | string
    content?: StringFilter<"GroupMessage"> | string
    fileUrl?: StringNullableFilter<"GroupMessage"> | string | null
    deleted?: BoolFilter<"GroupMessage"> | boolean
    memberId?: StringFilter<"GroupMessage"> | string
    groupConversationId?: StringFilter<"GroupMessage"> | string
    createdAt?: DateTimeFilter<"GroupMessage"> | Date | string
    updatedAt?: DateTimeFilter<"GroupMessage"> | Date | string
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    groupConversation?: XOR<GroupConversationScalarRelationFilter, GroupConversationWhereInput>
  }

  export type GroupMessageOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    fileUrl?: SortOrderInput | SortOrder
    deleted?: SortOrder
    memberId?: SortOrder
    groupConversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    member?: MemberOrderByWithRelationInput
    groupConversation?: GroupConversationOrderByWithRelationInput
  }

  export type GroupMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupMessageWhereInput | GroupMessageWhereInput[]
    OR?: GroupMessageWhereInput[]
    NOT?: GroupMessageWhereInput | GroupMessageWhereInput[]
    content?: StringFilter<"GroupMessage"> | string
    fileUrl?: StringNullableFilter<"GroupMessage"> | string | null
    deleted?: BoolFilter<"GroupMessage"> | boolean
    memberId?: StringFilter<"GroupMessage"> | string
    groupConversationId?: StringFilter<"GroupMessage"> | string
    createdAt?: DateTimeFilter<"GroupMessage"> | Date | string
    updatedAt?: DateTimeFilter<"GroupMessage"> | Date | string
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    groupConversation?: XOR<GroupConversationScalarRelationFilter, GroupConversationWhereInput>
  }, "id">

  export type GroupMessageOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    fileUrl?: SortOrderInput | SortOrder
    deleted?: SortOrder
    memberId?: SortOrder
    groupConversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupMessageCountOrderByAggregateInput
    _max?: GroupMessageMaxOrderByAggregateInput
    _min?: GroupMessageMinOrderByAggregateInput
  }

  export type GroupMessageScalarWhereWithAggregatesInput = {
    AND?: GroupMessageScalarWhereWithAggregatesInput | GroupMessageScalarWhereWithAggregatesInput[]
    OR?: GroupMessageScalarWhereWithAggregatesInput[]
    NOT?: GroupMessageScalarWhereWithAggregatesInput | GroupMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupMessage"> | string
    content?: StringWithAggregatesFilter<"GroupMessage"> | string
    fileUrl?: StringNullableWithAggregatesFilter<"GroupMessage"> | string | null
    deleted?: BoolWithAggregatesFilter<"GroupMessage"> | boolean
    memberId?: StringWithAggregatesFilter<"GroupMessage"> | string
    groupConversationId?: StringWithAggregatesFilter<"GroupMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GroupMessage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GroupMessage"> | Date | string
  }

  export type FriendRequestWhereInput = {
    AND?: FriendRequestWhereInput | FriendRequestWhereInput[]
    OR?: FriendRequestWhereInput[]
    NOT?: FriendRequestWhereInput | FriendRequestWhereInput[]
    id?: StringFilter<"FriendRequest"> | string
    requesterProfileId?: StringFilter<"FriendRequest"> | string
    targetProfileId?: StringFilter<"FriendRequest"> | string
    status?: EnumFriendRequestStatusFilter<"FriendRequest"> | $Enums.FriendRequestStatus
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
    updatedAt?: DateTimeFilter<"FriendRequest"> | Date | string
    requesterProfile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    targetProfile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type FriendRequestOrderByWithRelationInput = {
    id?: SortOrder
    requesterProfileId?: SortOrder
    targetProfileId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    requesterProfile?: ProfileOrderByWithRelationInput
    targetProfile?: ProfileOrderByWithRelationInput
  }

  export type FriendRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    requesterProfileId_targetProfileId?: FriendRequestRequesterProfileIdTargetProfileIdCompoundUniqueInput
    AND?: FriendRequestWhereInput | FriendRequestWhereInput[]
    OR?: FriendRequestWhereInput[]
    NOT?: FriendRequestWhereInput | FriendRequestWhereInput[]
    requesterProfileId?: StringFilter<"FriendRequest"> | string
    targetProfileId?: StringFilter<"FriendRequest"> | string
    status?: EnumFriendRequestStatusFilter<"FriendRequest"> | $Enums.FriendRequestStatus
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
    updatedAt?: DateTimeFilter<"FriendRequest"> | Date | string
    requesterProfile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    targetProfile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id" | "requesterProfileId_targetProfileId">

  export type FriendRequestOrderByWithAggregationInput = {
    id?: SortOrder
    requesterProfileId?: SortOrder
    targetProfileId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FriendRequestCountOrderByAggregateInput
    _max?: FriendRequestMaxOrderByAggregateInput
    _min?: FriendRequestMinOrderByAggregateInput
  }

  export type FriendRequestScalarWhereWithAggregatesInput = {
    AND?: FriendRequestScalarWhereWithAggregatesInput | FriendRequestScalarWhereWithAggregatesInput[]
    OR?: FriendRequestScalarWhereWithAggregatesInput[]
    NOT?: FriendRequestScalarWhereWithAggregatesInput | FriendRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FriendRequest"> | string
    requesterProfileId?: StringWithAggregatesFilter<"FriendRequest"> | string
    targetProfileId?: StringWithAggregatesFilter<"FriendRequest"> | string
    status?: EnumFriendRequestStatusWithAggregatesFilter<"FriendRequest"> | $Enums.FriendRequestStatus
    createdAt?: DateTimeWithAggregatesFilter<"FriendRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FriendRequest"> | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerCreateNestedManyWithoutProfileInput
    members?: MemberCreateNestedManyWithoutProfileInput
    channels?: ChannelCreateNestedManyWithoutProfileInput
    conversations?: ConversationCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerUncheckedCreateNestedManyWithoutProfileInput
    members?: MemberUncheckedCreateNestedManyWithoutProfileInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProfileInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationUncheckedCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestUncheckedCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestUncheckedCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUpdateManyWithoutProfileNestedInput
    members?: MemberUpdateManyWithoutProfileNestedInput
    channels?: ChannelUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUpdateManyWithoutTargetProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUncheckedUpdateManyWithoutProfileNestedInput
    members?: MemberUncheckedUpdateManyWithoutProfileNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUncheckedUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUncheckedUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUncheckedUpdateManyWithoutTargetProfileNestedInput
  }

  export type ProfileCreateManyInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerCreateInput = {
    id?: string
    name: string
    imageUrl: string
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutServersInput
    members?: MemberCreateNestedManyWithoutServerInput
    channels?: ChannelCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateInput = {
    id?: string
    name: string
    imageUrl: string
    inviteCode: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberUncheckedCreateNestedManyWithoutServerInput
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutServersNestedInput
    members?: MemberUpdateManyWithoutServerNestedInput
    channels?: ChannelUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUncheckedUpdateManyWithoutServerNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
  }

  export type ServerCreateManyInput = {
    id?: string
    name: string
    imageUrl: string
    inviteCode: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCreateInput = {
    id?: string
    role?: $Enums.MemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutMembersInput
    server: ServerCreateNestedOneWithoutMembersInput
    conversationsInitiated?: ConversationCreateNestedManyWithoutMemberOneInput
    conversationsReceived?: ConversationCreateNestedManyWithoutMemberTwoInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutMemberInput
    groupMessages?: GroupMessageCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateInput = {
    id?: string
    role?: $Enums.MemberRole
    profileId: string
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversationsInitiated?: ConversationUncheckedCreateNestedManyWithoutMemberOneInput
    conversationsReceived?: ConversationUncheckedCreateNestedManyWithoutMemberTwoInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutMemberInput
    groupMessages?: GroupMessageUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutMembersNestedInput
    server?: ServerUpdateOneRequiredWithoutMembersNestedInput
    conversationsInitiated?: ConversationUpdateManyWithoutMemberOneNestedInput
    conversationsReceived?: ConversationUpdateManyWithoutMemberTwoNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutMemberNestedInput
    groupMessages?: GroupMessageUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationsInitiated?: ConversationUncheckedUpdateManyWithoutMemberOneNestedInput
    conversationsReceived?: ConversationUncheckedUpdateManyWithoutMemberTwoNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutMemberNestedInput
    groupMessages?: GroupMessageUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberCreateManyInput = {
    id?: string
    role?: $Enums.MemberRole
    profileId: string
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelCreateInput = {
    id?: string
    name: string
    type?: $Enums.ChannelType
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutChannelsInput
    server: ServerCreateNestedOneWithoutChannelsInput
  }

  export type ChannelUncheckedCreateInput = {
    id?: string
    name: string
    type?: $Enums.ChannelType
    profileId: string
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChannelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutChannelsNestedInput
    server?: ServerUpdateOneRequiredWithoutChannelsNestedInput
  }

  export type ChannelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    profileId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelCreateManyInput = {
    id?: string
    name: string
    type?: $Enums.ChannelType
    profileId: string
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChannelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    profileId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberOne: MemberCreateNestedOneWithoutConversationsInitiatedInput
    memberTwo: MemberCreateNestedOneWithoutConversationsReceivedInput
    profile: ProfileCreateNestedOneWithoutConversationsInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    memberOneId: string
    memberTwoId: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberOne?: MemberUpdateOneRequiredWithoutConversationsInitiatedNestedInput
    memberTwo?: MemberUpdateOneRequiredWithoutConversationsReceivedNestedInput
    profile?: ProfileUpdateOneRequiredWithoutConversationsNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberOneId?: StringFieldUpdateOperationsInput | string
    memberTwoId?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateManyInput = {
    id?: string
    memberOneId: string
    memberTwoId: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberOneId?: StringFieldUpdateOperationsInput | string
    memberTwoId?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationCreateInput = {
    id?: string
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutGroupConversationsCreatedInput
    members?: GroupConversationMemberCreateNestedManyWithoutGroupConversationInput
    messages?: GroupMessageCreateNestedManyWithoutGroupConversationInput
  }

  export type GroupConversationUncheckedCreateInput = {
    id?: string
    name: string
    imageUrl?: string | null
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: GroupConversationMemberUncheckedCreateNestedManyWithoutGroupConversationInput
    messages?: GroupMessageUncheckedCreateNestedManyWithoutGroupConversationInput
  }

  export type GroupConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutGroupConversationsCreatedNestedInput
    members?: GroupConversationMemberUpdateManyWithoutGroupConversationNestedInput
    messages?: GroupMessageUpdateManyWithoutGroupConversationNestedInput
  }

  export type GroupConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupConversationMemberUncheckedUpdateManyWithoutGroupConversationNestedInput
    messages?: GroupMessageUncheckedUpdateManyWithoutGroupConversationNestedInput
  }

  export type GroupConversationCreateManyInput = {
    id?: string
    name: string
    imageUrl?: string | null
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationMemberCreateInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutGroupConversationsInput
    member: MemberCreateNestedOneWithoutGroupConversationsInput
    groupConversation: GroupConversationCreateNestedOneWithoutMembersInput
  }

  export type GroupConversationMemberUncheckedCreateInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    profileId: string
    memberId: string
    groupConversationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupConversationMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutGroupConversationsNestedInput
    member?: MemberUpdateOneRequiredWithoutGroupConversationsNestedInput
    groupConversation?: GroupConversationUpdateOneRequiredWithoutMembersNestedInput
  }

  export type GroupConversationMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    groupConversationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationMemberCreateManyInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    profileId: string
    memberId: string
    groupConversationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupConversationMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    groupConversationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMessageCreateInput = {
    id?: string
    content: string
    fileUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutGroupMessagesInput
    groupConversation: GroupConversationCreateNestedOneWithoutMessagesInput
  }

  export type GroupMessageUncheckedCreateInput = {
    id?: string
    content: string
    fileUrl?: string | null
    deleted?: boolean
    memberId: string
    groupConversationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutGroupMessagesNestedInput
    groupConversation?: GroupConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type GroupMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    memberId?: StringFieldUpdateOperationsInput | string
    groupConversationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMessageCreateManyInput = {
    id?: string
    content: string
    fileUrl?: string | null
    deleted?: boolean
    memberId: string
    groupConversationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    memberId?: StringFieldUpdateOperationsInput | string
    groupConversationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestCreateInput = {
    id?: string
    status?: $Enums.FriendRequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    requesterProfile: ProfileCreateNestedOneWithoutFriendRequestsSentInput
    targetProfile: ProfileCreateNestedOneWithoutFriendRequestsReceivedInput
  }

  export type FriendRequestUncheckedCreateInput = {
    id?: string
    requesterProfileId: string
    targetProfileId: string
    status?: $Enums.FriendRequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendRequestStatusFieldUpdateOperationsInput | $Enums.FriendRequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requesterProfile?: ProfileUpdateOneRequiredWithoutFriendRequestsSentNestedInput
    targetProfile?: ProfileUpdateOneRequiredWithoutFriendRequestsReceivedNestedInput
  }

  export type FriendRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterProfileId?: StringFieldUpdateOperationsInput | string
    targetProfileId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendRequestStatusFieldUpdateOperationsInput | $Enums.FriendRequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestCreateManyInput = {
    id?: string
    requesterProfileId: string
    targetProfileId: string
    status?: $Enums.FriendRequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendRequestStatusFieldUpdateOperationsInput | $Enums.FriendRequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterProfileId?: StringFieldUpdateOperationsInput | string
    targetProfileId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendRequestStatusFieldUpdateOperationsInput | $Enums.FriendRequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ServerListRelationFilter = {
    every?: ServerWhereInput
    some?: ServerWhereInput
    none?: ServerWhereInput
  }

  export type MemberListRelationFilter = {
    every?: MemberWhereInput
    some?: MemberWhereInput
    none?: MemberWhereInput
  }

  export type ChannelListRelationFilter = {
    every?: ChannelWhereInput
    some?: ChannelWhereInput
    none?: ChannelWhereInput
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type GroupConversationMemberListRelationFilter = {
    every?: GroupConversationMemberWhereInput
    some?: GroupConversationMemberWhereInput
    none?: GroupConversationMemberWhereInput
  }

  export type GroupConversationListRelationFilter = {
    every?: GroupConversationWhereInput
    some?: GroupConversationWhereInput
    none?: GroupConversationWhereInput
  }

  export type FriendRequestListRelationFilter = {
    every?: FriendRequestWhereInput
    some?: FriendRequestWhereInput
    none?: FriendRequestWhereInput
  }

  export type ServerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChannelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupConversationMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FriendRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type ServerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    inviteCode?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    inviteCode?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    inviteCode?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleFilter<$PrismaModel> | $Enums.MemberRole
  }

  export type ServerScalarRelationFilter = {
    is?: ServerWhereInput
    isNot?: ServerWhereInput
  }

  export type GroupMessageListRelationFilter = {
    every?: GroupMessageWhereInput
    some?: GroupMessageWhereInput
    none?: GroupMessageWhereInput
  }

  export type GroupMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberProfileIdServerIdCompoundUniqueInput = {
    profileId: string
    serverId: string
  }

  export type MemberCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    profileId?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    profileId?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    profileId?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.MemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumMemberRoleFilter<$PrismaModel>
  }

  export type EnumChannelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeFilter<$PrismaModel> | $Enums.ChannelType
  }

  export type ChannelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    profileId?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChannelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    profileId?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChannelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    profileId?: SortOrder
    serverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumChannelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChannelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChannelTypeFilter<$PrismaModel>
    _max?: NestedEnumChannelTypeFilter<$PrismaModel>
  }

  export type MemberScalarRelationFilter = {
    is?: MemberWhereInput
    isNot?: MemberWhereInput
  }

  export type ConversationMemberOneIdMemberTwoIdCompoundUniqueInput = {
    memberOneId: string
    memberTwoId: string
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    memberOneId?: SortOrder
    memberTwoId?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    memberOneId?: SortOrder
    memberTwoId?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    memberOneId?: SortOrder
    memberTwoId?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GroupConversationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupConversationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    profileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumGroupMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupMemberRole | EnumGroupMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.GroupMemberRole[] | ListEnumGroupMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupMemberRole[] | ListEnumGroupMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupMemberRoleFilter<$PrismaModel> | $Enums.GroupMemberRole
  }

  export type GroupConversationScalarRelationFilter = {
    is?: GroupConversationWhereInput
    isNot?: GroupConversationWhereInput
  }

  export type GroupConversationMemberProfileIdGroupConversationIdCompoundUniqueInput = {
    profileId: string
    groupConversationId: string
  }

  export type GroupConversationMemberCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    profileId?: SortOrder
    memberId?: SortOrder
    groupConversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupConversationMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    profileId?: SortOrder
    memberId?: SortOrder
    groupConversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupConversationMemberMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    profileId?: SortOrder
    memberId?: SortOrder
    groupConversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumGroupMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupMemberRole | EnumGroupMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.GroupMemberRole[] | ListEnumGroupMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupMemberRole[] | ListEnumGroupMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.GroupMemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGroupMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumGroupMemberRoleFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type GroupMessageCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    fileUrl?: SortOrder
    deleted?: SortOrder
    memberId?: SortOrder
    groupConversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    fileUrl?: SortOrder
    deleted?: SortOrder
    memberId?: SortOrder
    groupConversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMessageMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    fileUrl?: SortOrder
    deleted?: SortOrder
    memberId?: SortOrder
    groupConversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumFriendRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendRequestStatus | EnumFriendRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendRequestStatus[] | ListEnumFriendRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendRequestStatus[] | ListEnumFriendRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendRequestStatusFilter<$PrismaModel> | $Enums.FriendRequestStatus
  }

  export type FriendRequestRequesterProfileIdTargetProfileIdCompoundUniqueInput = {
    requesterProfileId: string
    targetProfileId: string
  }

  export type FriendRequestCountOrderByAggregateInput = {
    id?: SortOrder
    requesterProfileId?: SortOrder
    targetProfileId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    requesterProfileId?: SortOrder
    targetProfileId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendRequestMinOrderByAggregateInput = {
    id?: SortOrder
    requesterProfileId?: SortOrder
    targetProfileId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumFriendRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendRequestStatus | EnumFriendRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendRequestStatus[] | ListEnumFriendRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendRequestStatus[] | ListEnumFriendRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.FriendRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFriendRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumFriendRequestStatusFilter<$PrismaModel>
  }

  export type ServerCreateNestedManyWithoutProfileInput = {
    create?: XOR<ServerCreateWithoutProfileInput, ServerUncheckedCreateWithoutProfileInput> | ServerCreateWithoutProfileInput[] | ServerUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ServerCreateOrConnectWithoutProfileInput | ServerCreateOrConnectWithoutProfileInput[]
    createMany?: ServerCreateManyProfileInputEnvelope
    connect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
  }

  export type MemberCreateNestedManyWithoutProfileInput = {
    create?: XOR<MemberCreateWithoutProfileInput, MemberUncheckedCreateWithoutProfileInput> | MemberCreateWithoutProfileInput[] | MemberUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutProfileInput | MemberCreateOrConnectWithoutProfileInput[]
    createMany?: MemberCreateManyProfileInputEnvelope
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
  }

  export type ChannelCreateNestedManyWithoutProfileInput = {
    create?: XOR<ChannelCreateWithoutProfileInput, ChannelUncheckedCreateWithoutProfileInput> | ChannelCreateWithoutProfileInput[] | ChannelUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutProfileInput | ChannelCreateOrConnectWithoutProfileInput[]
    createMany?: ChannelCreateManyProfileInputEnvelope
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
  }

  export type ConversationCreateNestedManyWithoutProfileInput = {
    create?: XOR<ConversationCreateWithoutProfileInput, ConversationUncheckedCreateWithoutProfileInput> | ConversationCreateWithoutProfileInput[] | ConversationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProfileInput | ConversationCreateOrConnectWithoutProfileInput[]
    createMany?: ConversationCreateManyProfileInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type GroupConversationMemberCreateNestedManyWithoutProfileInput = {
    create?: XOR<GroupConversationMemberCreateWithoutProfileInput, GroupConversationMemberUncheckedCreateWithoutProfileInput> | GroupConversationMemberCreateWithoutProfileInput[] | GroupConversationMemberUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutProfileInput | GroupConversationMemberCreateOrConnectWithoutProfileInput[]
    createMany?: GroupConversationMemberCreateManyProfileInputEnvelope
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
  }

  export type GroupConversationCreateNestedManyWithoutProfileInput = {
    create?: XOR<GroupConversationCreateWithoutProfileInput, GroupConversationUncheckedCreateWithoutProfileInput> | GroupConversationCreateWithoutProfileInput[] | GroupConversationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: GroupConversationCreateOrConnectWithoutProfileInput | GroupConversationCreateOrConnectWithoutProfileInput[]
    createMany?: GroupConversationCreateManyProfileInputEnvelope
    connect?: GroupConversationWhereUniqueInput | GroupConversationWhereUniqueInput[]
  }

  export type FriendRequestCreateNestedManyWithoutRequesterProfileInput = {
    create?: XOR<FriendRequestCreateWithoutRequesterProfileInput, FriendRequestUncheckedCreateWithoutRequesterProfileInput> | FriendRequestCreateWithoutRequesterProfileInput[] | FriendRequestUncheckedCreateWithoutRequesterProfileInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutRequesterProfileInput | FriendRequestCreateOrConnectWithoutRequesterProfileInput[]
    createMany?: FriendRequestCreateManyRequesterProfileInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type FriendRequestCreateNestedManyWithoutTargetProfileInput = {
    create?: XOR<FriendRequestCreateWithoutTargetProfileInput, FriendRequestUncheckedCreateWithoutTargetProfileInput> | FriendRequestCreateWithoutTargetProfileInput[] | FriendRequestUncheckedCreateWithoutTargetProfileInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutTargetProfileInput | FriendRequestCreateOrConnectWithoutTargetProfileInput[]
    createMany?: FriendRequestCreateManyTargetProfileInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type ServerUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<ServerCreateWithoutProfileInput, ServerUncheckedCreateWithoutProfileInput> | ServerCreateWithoutProfileInput[] | ServerUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ServerCreateOrConnectWithoutProfileInput | ServerCreateOrConnectWithoutProfileInput[]
    createMany?: ServerCreateManyProfileInputEnvelope
    connect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
  }

  export type MemberUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<MemberCreateWithoutProfileInput, MemberUncheckedCreateWithoutProfileInput> | MemberCreateWithoutProfileInput[] | MemberUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutProfileInput | MemberCreateOrConnectWithoutProfileInput[]
    createMany?: MemberCreateManyProfileInputEnvelope
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
  }

  export type ChannelUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<ChannelCreateWithoutProfileInput, ChannelUncheckedCreateWithoutProfileInput> | ChannelCreateWithoutProfileInput[] | ChannelUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutProfileInput | ChannelCreateOrConnectWithoutProfileInput[]
    createMany?: ChannelCreateManyProfileInputEnvelope
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<ConversationCreateWithoutProfileInput, ConversationUncheckedCreateWithoutProfileInput> | ConversationCreateWithoutProfileInput[] | ConversationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProfileInput | ConversationCreateOrConnectWithoutProfileInput[]
    createMany?: ConversationCreateManyProfileInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type GroupConversationMemberUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<GroupConversationMemberCreateWithoutProfileInput, GroupConversationMemberUncheckedCreateWithoutProfileInput> | GroupConversationMemberCreateWithoutProfileInput[] | GroupConversationMemberUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutProfileInput | GroupConversationMemberCreateOrConnectWithoutProfileInput[]
    createMany?: GroupConversationMemberCreateManyProfileInputEnvelope
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
  }

  export type GroupConversationUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<GroupConversationCreateWithoutProfileInput, GroupConversationUncheckedCreateWithoutProfileInput> | GroupConversationCreateWithoutProfileInput[] | GroupConversationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: GroupConversationCreateOrConnectWithoutProfileInput | GroupConversationCreateOrConnectWithoutProfileInput[]
    createMany?: GroupConversationCreateManyProfileInputEnvelope
    connect?: GroupConversationWhereUniqueInput | GroupConversationWhereUniqueInput[]
  }

  export type FriendRequestUncheckedCreateNestedManyWithoutRequesterProfileInput = {
    create?: XOR<FriendRequestCreateWithoutRequesterProfileInput, FriendRequestUncheckedCreateWithoutRequesterProfileInput> | FriendRequestCreateWithoutRequesterProfileInput[] | FriendRequestUncheckedCreateWithoutRequesterProfileInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutRequesterProfileInput | FriendRequestCreateOrConnectWithoutRequesterProfileInput[]
    createMany?: FriendRequestCreateManyRequesterProfileInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type FriendRequestUncheckedCreateNestedManyWithoutTargetProfileInput = {
    create?: XOR<FriendRequestCreateWithoutTargetProfileInput, FriendRequestUncheckedCreateWithoutTargetProfileInput> | FriendRequestCreateWithoutTargetProfileInput[] | FriendRequestUncheckedCreateWithoutTargetProfileInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutTargetProfileInput | FriendRequestCreateOrConnectWithoutTargetProfileInput[]
    createMany?: FriendRequestCreateManyTargetProfileInputEnvelope
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ServerUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ServerCreateWithoutProfileInput, ServerUncheckedCreateWithoutProfileInput> | ServerCreateWithoutProfileInput[] | ServerUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ServerCreateOrConnectWithoutProfileInput | ServerCreateOrConnectWithoutProfileInput[]
    upsert?: ServerUpsertWithWhereUniqueWithoutProfileInput | ServerUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ServerCreateManyProfileInputEnvelope
    set?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    disconnect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    delete?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    connect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    update?: ServerUpdateWithWhereUniqueWithoutProfileInput | ServerUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ServerUpdateManyWithWhereWithoutProfileInput | ServerUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ServerScalarWhereInput | ServerScalarWhereInput[]
  }

  export type MemberUpdateManyWithoutProfileNestedInput = {
    create?: XOR<MemberCreateWithoutProfileInput, MemberUncheckedCreateWithoutProfileInput> | MemberCreateWithoutProfileInput[] | MemberUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutProfileInput | MemberCreateOrConnectWithoutProfileInput[]
    upsert?: MemberUpsertWithWhereUniqueWithoutProfileInput | MemberUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: MemberCreateManyProfileInputEnvelope
    set?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    disconnect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    delete?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    update?: MemberUpdateWithWhereUniqueWithoutProfileInput | MemberUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: MemberUpdateManyWithWhereWithoutProfileInput | MemberUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: MemberScalarWhereInput | MemberScalarWhereInput[]
  }

  export type ChannelUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ChannelCreateWithoutProfileInput, ChannelUncheckedCreateWithoutProfileInput> | ChannelCreateWithoutProfileInput[] | ChannelUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutProfileInput | ChannelCreateOrConnectWithoutProfileInput[]
    upsert?: ChannelUpsertWithWhereUniqueWithoutProfileInput | ChannelUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ChannelCreateManyProfileInputEnvelope
    set?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    disconnect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    delete?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    update?: ChannelUpdateWithWhereUniqueWithoutProfileInput | ChannelUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ChannelUpdateManyWithWhereWithoutProfileInput | ChannelUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
  }

  export type ConversationUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ConversationCreateWithoutProfileInput, ConversationUncheckedCreateWithoutProfileInput> | ConversationCreateWithoutProfileInput[] | ConversationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProfileInput | ConversationCreateOrConnectWithoutProfileInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutProfileInput | ConversationUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ConversationCreateManyProfileInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutProfileInput | ConversationUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutProfileInput | ConversationUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type GroupConversationMemberUpdateManyWithoutProfileNestedInput = {
    create?: XOR<GroupConversationMemberCreateWithoutProfileInput, GroupConversationMemberUncheckedCreateWithoutProfileInput> | GroupConversationMemberCreateWithoutProfileInput[] | GroupConversationMemberUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutProfileInput | GroupConversationMemberCreateOrConnectWithoutProfileInput[]
    upsert?: GroupConversationMemberUpsertWithWhereUniqueWithoutProfileInput | GroupConversationMemberUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: GroupConversationMemberCreateManyProfileInputEnvelope
    set?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    disconnect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    delete?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    update?: GroupConversationMemberUpdateWithWhereUniqueWithoutProfileInput | GroupConversationMemberUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: GroupConversationMemberUpdateManyWithWhereWithoutProfileInput | GroupConversationMemberUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: GroupConversationMemberScalarWhereInput | GroupConversationMemberScalarWhereInput[]
  }

  export type GroupConversationUpdateManyWithoutProfileNestedInput = {
    create?: XOR<GroupConversationCreateWithoutProfileInput, GroupConversationUncheckedCreateWithoutProfileInput> | GroupConversationCreateWithoutProfileInput[] | GroupConversationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: GroupConversationCreateOrConnectWithoutProfileInput | GroupConversationCreateOrConnectWithoutProfileInput[]
    upsert?: GroupConversationUpsertWithWhereUniqueWithoutProfileInput | GroupConversationUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: GroupConversationCreateManyProfileInputEnvelope
    set?: GroupConversationWhereUniqueInput | GroupConversationWhereUniqueInput[]
    disconnect?: GroupConversationWhereUniqueInput | GroupConversationWhereUniqueInput[]
    delete?: GroupConversationWhereUniqueInput | GroupConversationWhereUniqueInput[]
    connect?: GroupConversationWhereUniqueInput | GroupConversationWhereUniqueInput[]
    update?: GroupConversationUpdateWithWhereUniqueWithoutProfileInput | GroupConversationUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: GroupConversationUpdateManyWithWhereWithoutProfileInput | GroupConversationUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: GroupConversationScalarWhereInput | GroupConversationScalarWhereInput[]
  }

  export type FriendRequestUpdateManyWithoutRequesterProfileNestedInput = {
    create?: XOR<FriendRequestCreateWithoutRequesterProfileInput, FriendRequestUncheckedCreateWithoutRequesterProfileInput> | FriendRequestCreateWithoutRequesterProfileInput[] | FriendRequestUncheckedCreateWithoutRequesterProfileInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutRequesterProfileInput | FriendRequestCreateOrConnectWithoutRequesterProfileInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutRequesterProfileInput | FriendRequestUpsertWithWhereUniqueWithoutRequesterProfileInput[]
    createMany?: FriendRequestCreateManyRequesterProfileInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutRequesterProfileInput | FriendRequestUpdateWithWhereUniqueWithoutRequesterProfileInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutRequesterProfileInput | FriendRequestUpdateManyWithWhereWithoutRequesterProfileInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type FriendRequestUpdateManyWithoutTargetProfileNestedInput = {
    create?: XOR<FriendRequestCreateWithoutTargetProfileInput, FriendRequestUncheckedCreateWithoutTargetProfileInput> | FriendRequestCreateWithoutTargetProfileInput[] | FriendRequestUncheckedCreateWithoutTargetProfileInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutTargetProfileInput | FriendRequestCreateOrConnectWithoutTargetProfileInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutTargetProfileInput | FriendRequestUpsertWithWhereUniqueWithoutTargetProfileInput[]
    createMany?: FriendRequestCreateManyTargetProfileInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutTargetProfileInput | FriendRequestUpdateWithWhereUniqueWithoutTargetProfileInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutTargetProfileInput | FriendRequestUpdateManyWithWhereWithoutTargetProfileInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type ServerUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ServerCreateWithoutProfileInput, ServerUncheckedCreateWithoutProfileInput> | ServerCreateWithoutProfileInput[] | ServerUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ServerCreateOrConnectWithoutProfileInput | ServerCreateOrConnectWithoutProfileInput[]
    upsert?: ServerUpsertWithWhereUniqueWithoutProfileInput | ServerUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ServerCreateManyProfileInputEnvelope
    set?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    disconnect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    delete?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    connect?: ServerWhereUniqueInput | ServerWhereUniqueInput[]
    update?: ServerUpdateWithWhereUniqueWithoutProfileInput | ServerUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ServerUpdateManyWithWhereWithoutProfileInput | ServerUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ServerScalarWhereInput | ServerScalarWhereInput[]
  }

  export type MemberUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<MemberCreateWithoutProfileInput, MemberUncheckedCreateWithoutProfileInput> | MemberCreateWithoutProfileInput[] | MemberUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutProfileInput | MemberCreateOrConnectWithoutProfileInput[]
    upsert?: MemberUpsertWithWhereUniqueWithoutProfileInput | MemberUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: MemberCreateManyProfileInputEnvelope
    set?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    disconnect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    delete?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    update?: MemberUpdateWithWhereUniqueWithoutProfileInput | MemberUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: MemberUpdateManyWithWhereWithoutProfileInput | MemberUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: MemberScalarWhereInput | MemberScalarWhereInput[]
  }

  export type ChannelUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ChannelCreateWithoutProfileInput, ChannelUncheckedCreateWithoutProfileInput> | ChannelCreateWithoutProfileInput[] | ChannelUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutProfileInput | ChannelCreateOrConnectWithoutProfileInput[]
    upsert?: ChannelUpsertWithWhereUniqueWithoutProfileInput | ChannelUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ChannelCreateManyProfileInputEnvelope
    set?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    disconnect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    delete?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    update?: ChannelUpdateWithWhereUniqueWithoutProfileInput | ChannelUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ChannelUpdateManyWithWhereWithoutProfileInput | ChannelUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ConversationCreateWithoutProfileInput, ConversationUncheckedCreateWithoutProfileInput> | ConversationCreateWithoutProfileInput[] | ConversationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutProfileInput | ConversationCreateOrConnectWithoutProfileInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutProfileInput | ConversationUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ConversationCreateManyProfileInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutProfileInput | ConversationUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutProfileInput | ConversationUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type GroupConversationMemberUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<GroupConversationMemberCreateWithoutProfileInput, GroupConversationMemberUncheckedCreateWithoutProfileInput> | GroupConversationMemberCreateWithoutProfileInput[] | GroupConversationMemberUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutProfileInput | GroupConversationMemberCreateOrConnectWithoutProfileInput[]
    upsert?: GroupConversationMemberUpsertWithWhereUniqueWithoutProfileInput | GroupConversationMemberUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: GroupConversationMemberCreateManyProfileInputEnvelope
    set?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    disconnect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    delete?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    update?: GroupConversationMemberUpdateWithWhereUniqueWithoutProfileInput | GroupConversationMemberUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: GroupConversationMemberUpdateManyWithWhereWithoutProfileInput | GroupConversationMemberUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: GroupConversationMemberScalarWhereInput | GroupConversationMemberScalarWhereInput[]
  }

  export type GroupConversationUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<GroupConversationCreateWithoutProfileInput, GroupConversationUncheckedCreateWithoutProfileInput> | GroupConversationCreateWithoutProfileInput[] | GroupConversationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: GroupConversationCreateOrConnectWithoutProfileInput | GroupConversationCreateOrConnectWithoutProfileInput[]
    upsert?: GroupConversationUpsertWithWhereUniqueWithoutProfileInput | GroupConversationUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: GroupConversationCreateManyProfileInputEnvelope
    set?: GroupConversationWhereUniqueInput | GroupConversationWhereUniqueInput[]
    disconnect?: GroupConversationWhereUniqueInput | GroupConversationWhereUniqueInput[]
    delete?: GroupConversationWhereUniqueInput | GroupConversationWhereUniqueInput[]
    connect?: GroupConversationWhereUniqueInput | GroupConversationWhereUniqueInput[]
    update?: GroupConversationUpdateWithWhereUniqueWithoutProfileInput | GroupConversationUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: GroupConversationUpdateManyWithWhereWithoutProfileInput | GroupConversationUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: GroupConversationScalarWhereInput | GroupConversationScalarWhereInput[]
  }

  export type FriendRequestUncheckedUpdateManyWithoutRequesterProfileNestedInput = {
    create?: XOR<FriendRequestCreateWithoutRequesterProfileInput, FriendRequestUncheckedCreateWithoutRequesterProfileInput> | FriendRequestCreateWithoutRequesterProfileInput[] | FriendRequestUncheckedCreateWithoutRequesterProfileInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutRequesterProfileInput | FriendRequestCreateOrConnectWithoutRequesterProfileInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutRequesterProfileInput | FriendRequestUpsertWithWhereUniqueWithoutRequesterProfileInput[]
    createMany?: FriendRequestCreateManyRequesterProfileInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutRequesterProfileInput | FriendRequestUpdateWithWhereUniqueWithoutRequesterProfileInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutRequesterProfileInput | FriendRequestUpdateManyWithWhereWithoutRequesterProfileInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type FriendRequestUncheckedUpdateManyWithoutTargetProfileNestedInput = {
    create?: XOR<FriendRequestCreateWithoutTargetProfileInput, FriendRequestUncheckedCreateWithoutTargetProfileInput> | FriendRequestCreateWithoutTargetProfileInput[] | FriendRequestUncheckedCreateWithoutTargetProfileInput[]
    connectOrCreate?: FriendRequestCreateOrConnectWithoutTargetProfileInput | FriendRequestCreateOrConnectWithoutTargetProfileInput[]
    upsert?: FriendRequestUpsertWithWhereUniqueWithoutTargetProfileInput | FriendRequestUpsertWithWhereUniqueWithoutTargetProfileInput[]
    createMany?: FriendRequestCreateManyTargetProfileInputEnvelope
    set?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    disconnect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    delete?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    connect?: FriendRequestWhereUniqueInput | FriendRequestWhereUniqueInput[]
    update?: FriendRequestUpdateWithWhereUniqueWithoutTargetProfileInput | FriendRequestUpdateWithWhereUniqueWithoutTargetProfileInput[]
    updateMany?: FriendRequestUpdateManyWithWhereWithoutTargetProfileInput | FriendRequestUpdateManyWithWhereWithoutTargetProfileInput[]
    deleteMany?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutServersInput = {
    create?: XOR<ProfileCreateWithoutServersInput, ProfileUncheckedCreateWithoutServersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutServersInput
    connect?: ProfileWhereUniqueInput
  }

  export type MemberCreateNestedManyWithoutServerInput = {
    create?: XOR<MemberCreateWithoutServerInput, MemberUncheckedCreateWithoutServerInput> | MemberCreateWithoutServerInput[] | MemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutServerInput | MemberCreateOrConnectWithoutServerInput[]
    createMany?: MemberCreateManyServerInputEnvelope
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
  }

  export type ChannelCreateNestedManyWithoutServerInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
  }

  export type MemberUncheckedCreateNestedManyWithoutServerInput = {
    create?: XOR<MemberCreateWithoutServerInput, MemberUncheckedCreateWithoutServerInput> | MemberCreateWithoutServerInput[] | MemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutServerInput | MemberCreateOrConnectWithoutServerInput[]
    createMany?: MemberCreateManyServerInputEnvelope
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
  }

  export type ChannelUncheckedCreateNestedManyWithoutServerInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
  }

  export type ProfileUpdateOneRequiredWithoutServersNestedInput = {
    create?: XOR<ProfileCreateWithoutServersInput, ProfileUncheckedCreateWithoutServersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutServersInput
    upsert?: ProfileUpsertWithoutServersInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutServersInput, ProfileUpdateWithoutServersInput>, ProfileUncheckedUpdateWithoutServersInput>
  }

  export type MemberUpdateManyWithoutServerNestedInput = {
    create?: XOR<MemberCreateWithoutServerInput, MemberUncheckedCreateWithoutServerInput> | MemberCreateWithoutServerInput[] | MemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutServerInput | MemberCreateOrConnectWithoutServerInput[]
    upsert?: MemberUpsertWithWhereUniqueWithoutServerInput | MemberUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: MemberCreateManyServerInputEnvelope
    set?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    disconnect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    delete?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    update?: MemberUpdateWithWhereUniqueWithoutServerInput | MemberUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: MemberUpdateManyWithWhereWithoutServerInput | MemberUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: MemberScalarWhereInput | MemberScalarWhereInput[]
  }

  export type ChannelUpdateManyWithoutServerNestedInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    upsert?: ChannelUpsertWithWhereUniqueWithoutServerInput | ChannelUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    set?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    disconnect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    delete?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    update?: ChannelUpdateWithWhereUniqueWithoutServerInput | ChannelUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ChannelUpdateManyWithWhereWithoutServerInput | ChannelUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
  }

  export type MemberUncheckedUpdateManyWithoutServerNestedInput = {
    create?: XOR<MemberCreateWithoutServerInput, MemberUncheckedCreateWithoutServerInput> | MemberCreateWithoutServerInput[] | MemberUncheckedCreateWithoutServerInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutServerInput | MemberCreateOrConnectWithoutServerInput[]
    upsert?: MemberUpsertWithWhereUniqueWithoutServerInput | MemberUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: MemberCreateManyServerInputEnvelope
    set?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    disconnect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    delete?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    update?: MemberUpdateWithWhereUniqueWithoutServerInput | MemberUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: MemberUpdateManyWithWhereWithoutServerInput | MemberUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: MemberScalarWhereInput | MemberScalarWhereInput[]
  }

  export type ChannelUncheckedUpdateManyWithoutServerNestedInput = {
    create?: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput> | ChannelCreateWithoutServerInput[] | ChannelUncheckedCreateWithoutServerInput[]
    connectOrCreate?: ChannelCreateOrConnectWithoutServerInput | ChannelCreateOrConnectWithoutServerInput[]
    upsert?: ChannelUpsertWithWhereUniqueWithoutServerInput | ChannelUpsertWithWhereUniqueWithoutServerInput[]
    createMany?: ChannelCreateManyServerInputEnvelope
    set?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    disconnect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    delete?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    connect?: ChannelWhereUniqueInput | ChannelWhereUniqueInput[]
    update?: ChannelUpdateWithWhereUniqueWithoutServerInput | ChannelUpdateWithWhereUniqueWithoutServerInput[]
    updateMany?: ChannelUpdateManyWithWhereWithoutServerInput | ChannelUpdateManyWithWhereWithoutServerInput[]
    deleteMany?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutMembersInput = {
    create?: XOR<ProfileCreateWithoutMembersInput, ProfileUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutMembersInput
    connect?: ProfileWhereUniqueInput
  }

  export type ServerCreateNestedOneWithoutMembersInput = {
    create?: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ServerCreateOrConnectWithoutMembersInput
    connect?: ServerWhereUniqueInput
  }

  export type ConversationCreateNestedManyWithoutMemberOneInput = {
    create?: XOR<ConversationCreateWithoutMemberOneInput, ConversationUncheckedCreateWithoutMemberOneInput> | ConversationCreateWithoutMemberOneInput[] | ConversationUncheckedCreateWithoutMemberOneInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMemberOneInput | ConversationCreateOrConnectWithoutMemberOneInput[]
    createMany?: ConversationCreateManyMemberOneInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type ConversationCreateNestedManyWithoutMemberTwoInput = {
    create?: XOR<ConversationCreateWithoutMemberTwoInput, ConversationUncheckedCreateWithoutMemberTwoInput> | ConversationCreateWithoutMemberTwoInput[] | ConversationUncheckedCreateWithoutMemberTwoInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMemberTwoInput | ConversationCreateOrConnectWithoutMemberTwoInput[]
    createMany?: ConversationCreateManyMemberTwoInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type GroupConversationMemberCreateNestedManyWithoutMemberInput = {
    create?: XOR<GroupConversationMemberCreateWithoutMemberInput, GroupConversationMemberUncheckedCreateWithoutMemberInput> | GroupConversationMemberCreateWithoutMemberInput[] | GroupConversationMemberUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutMemberInput | GroupConversationMemberCreateOrConnectWithoutMemberInput[]
    createMany?: GroupConversationMemberCreateManyMemberInputEnvelope
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
  }

  export type GroupMessageCreateNestedManyWithoutMemberInput = {
    create?: XOR<GroupMessageCreateWithoutMemberInput, GroupMessageUncheckedCreateWithoutMemberInput> | GroupMessageCreateWithoutMemberInput[] | GroupMessageUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutMemberInput | GroupMessageCreateOrConnectWithoutMemberInput[]
    createMany?: GroupMessageCreateManyMemberInputEnvelope
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutMemberOneInput = {
    create?: XOR<ConversationCreateWithoutMemberOneInput, ConversationUncheckedCreateWithoutMemberOneInput> | ConversationCreateWithoutMemberOneInput[] | ConversationUncheckedCreateWithoutMemberOneInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMemberOneInput | ConversationCreateOrConnectWithoutMemberOneInput[]
    createMany?: ConversationCreateManyMemberOneInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutMemberTwoInput = {
    create?: XOR<ConversationCreateWithoutMemberTwoInput, ConversationUncheckedCreateWithoutMemberTwoInput> | ConversationCreateWithoutMemberTwoInput[] | ConversationUncheckedCreateWithoutMemberTwoInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMemberTwoInput | ConversationCreateOrConnectWithoutMemberTwoInput[]
    createMany?: ConversationCreateManyMemberTwoInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type GroupConversationMemberUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<GroupConversationMemberCreateWithoutMemberInput, GroupConversationMemberUncheckedCreateWithoutMemberInput> | GroupConversationMemberCreateWithoutMemberInput[] | GroupConversationMemberUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutMemberInput | GroupConversationMemberCreateOrConnectWithoutMemberInput[]
    createMany?: GroupConversationMemberCreateManyMemberInputEnvelope
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
  }

  export type GroupMessageUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<GroupMessageCreateWithoutMemberInput, GroupMessageUncheckedCreateWithoutMemberInput> | GroupMessageCreateWithoutMemberInput[] | GroupMessageUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutMemberInput | GroupMessageCreateOrConnectWithoutMemberInput[]
    createMany?: GroupMessageCreateManyMemberInputEnvelope
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
  }

  export type EnumMemberRoleFieldUpdateOperationsInput = {
    set?: $Enums.MemberRole
  }

  export type ProfileUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ProfileCreateWithoutMembersInput, ProfileUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutMembersInput
    upsert?: ProfileUpsertWithoutMembersInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutMembersInput, ProfileUpdateWithoutMembersInput>, ProfileUncheckedUpdateWithoutMembersInput>
  }

  export type ServerUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ServerCreateOrConnectWithoutMembersInput
    upsert?: ServerUpsertWithoutMembersInput
    connect?: ServerWhereUniqueInput
    update?: XOR<XOR<ServerUpdateToOneWithWhereWithoutMembersInput, ServerUpdateWithoutMembersInput>, ServerUncheckedUpdateWithoutMembersInput>
  }

  export type ConversationUpdateManyWithoutMemberOneNestedInput = {
    create?: XOR<ConversationCreateWithoutMemberOneInput, ConversationUncheckedCreateWithoutMemberOneInput> | ConversationCreateWithoutMemberOneInput[] | ConversationUncheckedCreateWithoutMemberOneInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMemberOneInput | ConversationCreateOrConnectWithoutMemberOneInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutMemberOneInput | ConversationUpsertWithWhereUniqueWithoutMemberOneInput[]
    createMany?: ConversationCreateManyMemberOneInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutMemberOneInput | ConversationUpdateWithWhereUniqueWithoutMemberOneInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutMemberOneInput | ConversationUpdateManyWithWhereWithoutMemberOneInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type ConversationUpdateManyWithoutMemberTwoNestedInput = {
    create?: XOR<ConversationCreateWithoutMemberTwoInput, ConversationUncheckedCreateWithoutMemberTwoInput> | ConversationCreateWithoutMemberTwoInput[] | ConversationUncheckedCreateWithoutMemberTwoInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMemberTwoInput | ConversationCreateOrConnectWithoutMemberTwoInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutMemberTwoInput | ConversationUpsertWithWhereUniqueWithoutMemberTwoInput[]
    createMany?: ConversationCreateManyMemberTwoInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutMemberTwoInput | ConversationUpdateWithWhereUniqueWithoutMemberTwoInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutMemberTwoInput | ConversationUpdateManyWithWhereWithoutMemberTwoInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type GroupConversationMemberUpdateManyWithoutMemberNestedInput = {
    create?: XOR<GroupConversationMemberCreateWithoutMemberInput, GroupConversationMemberUncheckedCreateWithoutMemberInput> | GroupConversationMemberCreateWithoutMemberInput[] | GroupConversationMemberUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutMemberInput | GroupConversationMemberCreateOrConnectWithoutMemberInput[]
    upsert?: GroupConversationMemberUpsertWithWhereUniqueWithoutMemberInput | GroupConversationMemberUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: GroupConversationMemberCreateManyMemberInputEnvelope
    set?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    disconnect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    delete?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    update?: GroupConversationMemberUpdateWithWhereUniqueWithoutMemberInput | GroupConversationMemberUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: GroupConversationMemberUpdateManyWithWhereWithoutMemberInput | GroupConversationMemberUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: GroupConversationMemberScalarWhereInput | GroupConversationMemberScalarWhereInput[]
  }

  export type GroupMessageUpdateManyWithoutMemberNestedInput = {
    create?: XOR<GroupMessageCreateWithoutMemberInput, GroupMessageUncheckedCreateWithoutMemberInput> | GroupMessageCreateWithoutMemberInput[] | GroupMessageUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutMemberInput | GroupMessageCreateOrConnectWithoutMemberInput[]
    upsert?: GroupMessageUpsertWithWhereUniqueWithoutMemberInput | GroupMessageUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: GroupMessageCreateManyMemberInputEnvelope
    set?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    disconnect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    delete?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    update?: GroupMessageUpdateWithWhereUniqueWithoutMemberInput | GroupMessageUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: GroupMessageUpdateManyWithWhereWithoutMemberInput | GroupMessageUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutMemberOneNestedInput = {
    create?: XOR<ConversationCreateWithoutMemberOneInput, ConversationUncheckedCreateWithoutMemberOneInput> | ConversationCreateWithoutMemberOneInput[] | ConversationUncheckedCreateWithoutMemberOneInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMemberOneInput | ConversationCreateOrConnectWithoutMemberOneInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutMemberOneInput | ConversationUpsertWithWhereUniqueWithoutMemberOneInput[]
    createMany?: ConversationCreateManyMemberOneInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutMemberOneInput | ConversationUpdateWithWhereUniqueWithoutMemberOneInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutMemberOneInput | ConversationUpdateManyWithWhereWithoutMemberOneInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutMemberTwoNestedInput = {
    create?: XOR<ConversationCreateWithoutMemberTwoInput, ConversationUncheckedCreateWithoutMemberTwoInput> | ConversationCreateWithoutMemberTwoInput[] | ConversationUncheckedCreateWithoutMemberTwoInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutMemberTwoInput | ConversationCreateOrConnectWithoutMemberTwoInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutMemberTwoInput | ConversationUpsertWithWhereUniqueWithoutMemberTwoInput[]
    createMany?: ConversationCreateManyMemberTwoInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutMemberTwoInput | ConversationUpdateWithWhereUniqueWithoutMemberTwoInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutMemberTwoInput | ConversationUpdateManyWithWhereWithoutMemberTwoInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type GroupConversationMemberUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<GroupConversationMemberCreateWithoutMemberInput, GroupConversationMemberUncheckedCreateWithoutMemberInput> | GroupConversationMemberCreateWithoutMemberInput[] | GroupConversationMemberUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutMemberInput | GroupConversationMemberCreateOrConnectWithoutMemberInput[]
    upsert?: GroupConversationMemberUpsertWithWhereUniqueWithoutMemberInput | GroupConversationMemberUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: GroupConversationMemberCreateManyMemberInputEnvelope
    set?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    disconnect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    delete?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    update?: GroupConversationMemberUpdateWithWhereUniqueWithoutMemberInput | GroupConversationMemberUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: GroupConversationMemberUpdateManyWithWhereWithoutMemberInput | GroupConversationMemberUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: GroupConversationMemberScalarWhereInput | GroupConversationMemberScalarWhereInput[]
  }

  export type GroupMessageUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<GroupMessageCreateWithoutMemberInput, GroupMessageUncheckedCreateWithoutMemberInput> | GroupMessageCreateWithoutMemberInput[] | GroupMessageUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutMemberInput | GroupMessageCreateOrConnectWithoutMemberInput[]
    upsert?: GroupMessageUpsertWithWhereUniqueWithoutMemberInput | GroupMessageUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: GroupMessageCreateManyMemberInputEnvelope
    set?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    disconnect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    delete?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    update?: GroupMessageUpdateWithWhereUniqueWithoutMemberInput | GroupMessageUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: GroupMessageUpdateManyWithWhereWithoutMemberInput | GroupMessageUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutChannelsInput = {
    create?: XOR<ProfileCreateWithoutChannelsInput, ProfileUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutChannelsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ServerCreateNestedOneWithoutChannelsInput = {
    create?: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: ServerCreateOrConnectWithoutChannelsInput
    connect?: ServerWhereUniqueInput
  }

  export type EnumChannelTypeFieldUpdateOperationsInput = {
    set?: $Enums.ChannelType
  }

  export type ProfileUpdateOneRequiredWithoutChannelsNestedInput = {
    create?: XOR<ProfileCreateWithoutChannelsInput, ProfileUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutChannelsInput
    upsert?: ProfileUpsertWithoutChannelsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutChannelsInput, ProfileUpdateWithoutChannelsInput>, ProfileUncheckedUpdateWithoutChannelsInput>
  }

  export type ServerUpdateOneRequiredWithoutChannelsNestedInput = {
    create?: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: ServerCreateOrConnectWithoutChannelsInput
    upsert?: ServerUpsertWithoutChannelsInput
    connect?: ServerWhereUniqueInput
    update?: XOR<XOR<ServerUpdateToOneWithWhereWithoutChannelsInput, ServerUpdateWithoutChannelsInput>, ServerUncheckedUpdateWithoutChannelsInput>
  }

  export type MemberCreateNestedOneWithoutConversationsInitiatedInput = {
    create?: XOR<MemberCreateWithoutConversationsInitiatedInput, MemberUncheckedCreateWithoutConversationsInitiatedInput>
    connectOrCreate?: MemberCreateOrConnectWithoutConversationsInitiatedInput
    connect?: MemberWhereUniqueInput
  }

  export type MemberCreateNestedOneWithoutConversationsReceivedInput = {
    create?: XOR<MemberCreateWithoutConversationsReceivedInput, MemberUncheckedCreateWithoutConversationsReceivedInput>
    connectOrCreate?: MemberCreateOrConnectWithoutConversationsReceivedInput
    connect?: MemberWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutConversationsInput = {
    create?: XOR<ProfileCreateWithoutConversationsInput, ProfileUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutConversationsInput
    connect?: ProfileWhereUniqueInput
  }

  export type MemberUpdateOneRequiredWithoutConversationsInitiatedNestedInput = {
    create?: XOR<MemberCreateWithoutConversationsInitiatedInput, MemberUncheckedCreateWithoutConversationsInitiatedInput>
    connectOrCreate?: MemberCreateOrConnectWithoutConversationsInitiatedInput
    upsert?: MemberUpsertWithoutConversationsInitiatedInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutConversationsInitiatedInput, MemberUpdateWithoutConversationsInitiatedInput>, MemberUncheckedUpdateWithoutConversationsInitiatedInput>
  }

  export type MemberUpdateOneRequiredWithoutConversationsReceivedNestedInput = {
    create?: XOR<MemberCreateWithoutConversationsReceivedInput, MemberUncheckedCreateWithoutConversationsReceivedInput>
    connectOrCreate?: MemberCreateOrConnectWithoutConversationsReceivedInput
    upsert?: MemberUpsertWithoutConversationsReceivedInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutConversationsReceivedInput, MemberUpdateWithoutConversationsReceivedInput>, MemberUncheckedUpdateWithoutConversationsReceivedInput>
  }

  export type ProfileUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<ProfileCreateWithoutConversationsInput, ProfileUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutConversationsInput
    upsert?: ProfileUpsertWithoutConversationsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutConversationsInput, ProfileUpdateWithoutConversationsInput>, ProfileUncheckedUpdateWithoutConversationsInput>
  }

  export type ProfileCreateNestedOneWithoutGroupConversationsCreatedInput = {
    create?: XOR<ProfileCreateWithoutGroupConversationsCreatedInput, ProfileUncheckedCreateWithoutGroupConversationsCreatedInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutGroupConversationsCreatedInput
    connect?: ProfileWhereUniqueInput
  }

  export type GroupConversationMemberCreateNestedManyWithoutGroupConversationInput = {
    create?: XOR<GroupConversationMemberCreateWithoutGroupConversationInput, GroupConversationMemberUncheckedCreateWithoutGroupConversationInput> | GroupConversationMemberCreateWithoutGroupConversationInput[] | GroupConversationMemberUncheckedCreateWithoutGroupConversationInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutGroupConversationInput | GroupConversationMemberCreateOrConnectWithoutGroupConversationInput[]
    createMany?: GroupConversationMemberCreateManyGroupConversationInputEnvelope
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
  }

  export type GroupMessageCreateNestedManyWithoutGroupConversationInput = {
    create?: XOR<GroupMessageCreateWithoutGroupConversationInput, GroupMessageUncheckedCreateWithoutGroupConversationInput> | GroupMessageCreateWithoutGroupConversationInput[] | GroupMessageUncheckedCreateWithoutGroupConversationInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutGroupConversationInput | GroupMessageCreateOrConnectWithoutGroupConversationInput[]
    createMany?: GroupMessageCreateManyGroupConversationInputEnvelope
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
  }

  export type GroupConversationMemberUncheckedCreateNestedManyWithoutGroupConversationInput = {
    create?: XOR<GroupConversationMemberCreateWithoutGroupConversationInput, GroupConversationMemberUncheckedCreateWithoutGroupConversationInput> | GroupConversationMemberCreateWithoutGroupConversationInput[] | GroupConversationMemberUncheckedCreateWithoutGroupConversationInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutGroupConversationInput | GroupConversationMemberCreateOrConnectWithoutGroupConversationInput[]
    createMany?: GroupConversationMemberCreateManyGroupConversationInputEnvelope
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
  }

  export type GroupMessageUncheckedCreateNestedManyWithoutGroupConversationInput = {
    create?: XOR<GroupMessageCreateWithoutGroupConversationInput, GroupMessageUncheckedCreateWithoutGroupConversationInput> | GroupMessageCreateWithoutGroupConversationInput[] | GroupMessageUncheckedCreateWithoutGroupConversationInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutGroupConversationInput | GroupMessageCreateOrConnectWithoutGroupConversationInput[]
    createMany?: GroupMessageCreateManyGroupConversationInputEnvelope
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ProfileUpdateOneRequiredWithoutGroupConversationsCreatedNestedInput = {
    create?: XOR<ProfileCreateWithoutGroupConversationsCreatedInput, ProfileUncheckedCreateWithoutGroupConversationsCreatedInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutGroupConversationsCreatedInput
    upsert?: ProfileUpsertWithoutGroupConversationsCreatedInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutGroupConversationsCreatedInput, ProfileUpdateWithoutGroupConversationsCreatedInput>, ProfileUncheckedUpdateWithoutGroupConversationsCreatedInput>
  }

  export type GroupConversationMemberUpdateManyWithoutGroupConversationNestedInput = {
    create?: XOR<GroupConversationMemberCreateWithoutGroupConversationInput, GroupConversationMemberUncheckedCreateWithoutGroupConversationInput> | GroupConversationMemberCreateWithoutGroupConversationInput[] | GroupConversationMemberUncheckedCreateWithoutGroupConversationInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutGroupConversationInput | GroupConversationMemberCreateOrConnectWithoutGroupConversationInput[]
    upsert?: GroupConversationMemberUpsertWithWhereUniqueWithoutGroupConversationInput | GroupConversationMemberUpsertWithWhereUniqueWithoutGroupConversationInput[]
    createMany?: GroupConversationMemberCreateManyGroupConversationInputEnvelope
    set?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    disconnect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    delete?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    update?: GroupConversationMemberUpdateWithWhereUniqueWithoutGroupConversationInput | GroupConversationMemberUpdateWithWhereUniqueWithoutGroupConversationInput[]
    updateMany?: GroupConversationMemberUpdateManyWithWhereWithoutGroupConversationInput | GroupConversationMemberUpdateManyWithWhereWithoutGroupConversationInput[]
    deleteMany?: GroupConversationMemberScalarWhereInput | GroupConversationMemberScalarWhereInput[]
  }

  export type GroupMessageUpdateManyWithoutGroupConversationNestedInput = {
    create?: XOR<GroupMessageCreateWithoutGroupConversationInput, GroupMessageUncheckedCreateWithoutGroupConversationInput> | GroupMessageCreateWithoutGroupConversationInput[] | GroupMessageUncheckedCreateWithoutGroupConversationInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutGroupConversationInput | GroupMessageCreateOrConnectWithoutGroupConversationInput[]
    upsert?: GroupMessageUpsertWithWhereUniqueWithoutGroupConversationInput | GroupMessageUpsertWithWhereUniqueWithoutGroupConversationInput[]
    createMany?: GroupMessageCreateManyGroupConversationInputEnvelope
    set?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    disconnect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    delete?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    update?: GroupMessageUpdateWithWhereUniqueWithoutGroupConversationInput | GroupMessageUpdateWithWhereUniqueWithoutGroupConversationInput[]
    updateMany?: GroupMessageUpdateManyWithWhereWithoutGroupConversationInput | GroupMessageUpdateManyWithWhereWithoutGroupConversationInput[]
    deleteMany?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
  }

  export type GroupConversationMemberUncheckedUpdateManyWithoutGroupConversationNestedInput = {
    create?: XOR<GroupConversationMemberCreateWithoutGroupConversationInput, GroupConversationMemberUncheckedCreateWithoutGroupConversationInput> | GroupConversationMemberCreateWithoutGroupConversationInput[] | GroupConversationMemberUncheckedCreateWithoutGroupConversationInput[]
    connectOrCreate?: GroupConversationMemberCreateOrConnectWithoutGroupConversationInput | GroupConversationMemberCreateOrConnectWithoutGroupConversationInput[]
    upsert?: GroupConversationMemberUpsertWithWhereUniqueWithoutGroupConversationInput | GroupConversationMemberUpsertWithWhereUniqueWithoutGroupConversationInput[]
    createMany?: GroupConversationMemberCreateManyGroupConversationInputEnvelope
    set?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    disconnect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    delete?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    connect?: GroupConversationMemberWhereUniqueInput | GroupConversationMemberWhereUniqueInput[]
    update?: GroupConversationMemberUpdateWithWhereUniqueWithoutGroupConversationInput | GroupConversationMemberUpdateWithWhereUniqueWithoutGroupConversationInput[]
    updateMany?: GroupConversationMemberUpdateManyWithWhereWithoutGroupConversationInput | GroupConversationMemberUpdateManyWithWhereWithoutGroupConversationInput[]
    deleteMany?: GroupConversationMemberScalarWhereInput | GroupConversationMemberScalarWhereInput[]
  }

  export type GroupMessageUncheckedUpdateManyWithoutGroupConversationNestedInput = {
    create?: XOR<GroupMessageCreateWithoutGroupConversationInput, GroupMessageUncheckedCreateWithoutGroupConversationInput> | GroupMessageCreateWithoutGroupConversationInput[] | GroupMessageUncheckedCreateWithoutGroupConversationInput[]
    connectOrCreate?: GroupMessageCreateOrConnectWithoutGroupConversationInput | GroupMessageCreateOrConnectWithoutGroupConversationInput[]
    upsert?: GroupMessageUpsertWithWhereUniqueWithoutGroupConversationInput | GroupMessageUpsertWithWhereUniqueWithoutGroupConversationInput[]
    createMany?: GroupMessageCreateManyGroupConversationInputEnvelope
    set?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    disconnect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    delete?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    connect?: GroupMessageWhereUniqueInput | GroupMessageWhereUniqueInput[]
    update?: GroupMessageUpdateWithWhereUniqueWithoutGroupConversationInput | GroupMessageUpdateWithWhereUniqueWithoutGroupConversationInput[]
    updateMany?: GroupMessageUpdateManyWithWhereWithoutGroupConversationInput | GroupMessageUpdateManyWithWhereWithoutGroupConversationInput[]
    deleteMany?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutGroupConversationsInput = {
    create?: XOR<ProfileCreateWithoutGroupConversationsInput, ProfileUncheckedCreateWithoutGroupConversationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutGroupConversationsInput
    connect?: ProfileWhereUniqueInput
  }

  export type MemberCreateNestedOneWithoutGroupConversationsInput = {
    create?: XOR<MemberCreateWithoutGroupConversationsInput, MemberUncheckedCreateWithoutGroupConversationsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutGroupConversationsInput
    connect?: MemberWhereUniqueInput
  }

  export type GroupConversationCreateNestedOneWithoutMembersInput = {
    create?: XOR<GroupConversationCreateWithoutMembersInput, GroupConversationUncheckedCreateWithoutMembersInput>
    connectOrCreate?: GroupConversationCreateOrConnectWithoutMembersInput
    connect?: GroupConversationWhereUniqueInput
  }

  export type EnumGroupMemberRoleFieldUpdateOperationsInput = {
    set?: $Enums.GroupMemberRole
  }

  export type ProfileUpdateOneRequiredWithoutGroupConversationsNestedInput = {
    create?: XOR<ProfileCreateWithoutGroupConversationsInput, ProfileUncheckedCreateWithoutGroupConversationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutGroupConversationsInput
    upsert?: ProfileUpsertWithoutGroupConversationsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutGroupConversationsInput, ProfileUpdateWithoutGroupConversationsInput>, ProfileUncheckedUpdateWithoutGroupConversationsInput>
  }

  export type MemberUpdateOneRequiredWithoutGroupConversationsNestedInput = {
    create?: XOR<MemberCreateWithoutGroupConversationsInput, MemberUncheckedCreateWithoutGroupConversationsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutGroupConversationsInput
    upsert?: MemberUpsertWithoutGroupConversationsInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutGroupConversationsInput, MemberUpdateWithoutGroupConversationsInput>, MemberUncheckedUpdateWithoutGroupConversationsInput>
  }

  export type GroupConversationUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<GroupConversationCreateWithoutMembersInput, GroupConversationUncheckedCreateWithoutMembersInput>
    connectOrCreate?: GroupConversationCreateOrConnectWithoutMembersInput
    upsert?: GroupConversationUpsertWithoutMembersInput
    connect?: GroupConversationWhereUniqueInput
    update?: XOR<XOR<GroupConversationUpdateToOneWithWhereWithoutMembersInput, GroupConversationUpdateWithoutMembersInput>, GroupConversationUncheckedUpdateWithoutMembersInput>
  }

  export type MemberCreateNestedOneWithoutGroupMessagesInput = {
    create?: XOR<MemberCreateWithoutGroupMessagesInput, MemberUncheckedCreateWithoutGroupMessagesInput>
    connectOrCreate?: MemberCreateOrConnectWithoutGroupMessagesInput
    connect?: MemberWhereUniqueInput
  }

  export type GroupConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<GroupConversationCreateWithoutMessagesInput, GroupConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: GroupConversationCreateOrConnectWithoutMessagesInput
    connect?: GroupConversationWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MemberUpdateOneRequiredWithoutGroupMessagesNestedInput = {
    create?: XOR<MemberCreateWithoutGroupMessagesInput, MemberUncheckedCreateWithoutGroupMessagesInput>
    connectOrCreate?: MemberCreateOrConnectWithoutGroupMessagesInput
    upsert?: MemberUpsertWithoutGroupMessagesInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutGroupMessagesInput, MemberUpdateWithoutGroupMessagesInput>, MemberUncheckedUpdateWithoutGroupMessagesInput>
  }

  export type GroupConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<GroupConversationCreateWithoutMessagesInput, GroupConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: GroupConversationCreateOrConnectWithoutMessagesInput
    upsert?: GroupConversationUpsertWithoutMessagesInput
    connect?: GroupConversationWhereUniqueInput
    update?: XOR<XOR<GroupConversationUpdateToOneWithWhereWithoutMessagesInput, GroupConversationUpdateWithoutMessagesInput>, GroupConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ProfileCreateNestedOneWithoutFriendRequestsSentInput = {
    create?: XOR<ProfileCreateWithoutFriendRequestsSentInput, ProfileUncheckedCreateWithoutFriendRequestsSentInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutFriendRequestsSentInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutFriendRequestsReceivedInput = {
    create?: XOR<ProfileCreateWithoutFriendRequestsReceivedInput, ProfileUncheckedCreateWithoutFriendRequestsReceivedInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutFriendRequestsReceivedInput
    connect?: ProfileWhereUniqueInput
  }

  export type EnumFriendRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.FriendRequestStatus
  }

  export type ProfileUpdateOneRequiredWithoutFriendRequestsSentNestedInput = {
    create?: XOR<ProfileCreateWithoutFriendRequestsSentInput, ProfileUncheckedCreateWithoutFriendRequestsSentInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutFriendRequestsSentInput
    upsert?: ProfileUpsertWithoutFriendRequestsSentInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutFriendRequestsSentInput, ProfileUpdateWithoutFriendRequestsSentInput>, ProfileUncheckedUpdateWithoutFriendRequestsSentInput>
  }

  export type ProfileUpdateOneRequiredWithoutFriendRequestsReceivedNestedInput = {
    create?: XOR<ProfileCreateWithoutFriendRequestsReceivedInput, ProfileUncheckedCreateWithoutFriendRequestsReceivedInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutFriendRequestsReceivedInput
    upsert?: ProfileUpsertWithoutFriendRequestsReceivedInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutFriendRequestsReceivedInput, ProfileUpdateWithoutFriendRequestsReceivedInput>, ProfileUncheckedUpdateWithoutFriendRequestsReceivedInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleFilter<$PrismaModel> | $Enums.MemberRole
  }

  export type NestedEnumMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.MemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumMemberRoleFilter<$PrismaModel>
  }

  export type NestedEnumChannelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeFilter<$PrismaModel> | $Enums.ChannelType
  }

  export type NestedEnumChannelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChannelType | EnumChannelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChannelType[] | ListEnumChannelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChannelTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChannelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChannelTypeFilter<$PrismaModel>
    _max?: NestedEnumChannelTypeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGroupMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupMemberRole | EnumGroupMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.GroupMemberRole[] | ListEnumGroupMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupMemberRole[] | ListEnumGroupMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupMemberRoleFilter<$PrismaModel> | $Enums.GroupMemberRole
  }

  export type NestedEnumGroupMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GroupMemberRole | EnumGroupMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.GroupMemberRole[] | ListEnumGroupMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.GroupMemberRole[] | ListEnumGroupMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumGroupMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.GroupMemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGroupMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumGroupMemberRoleFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumFriendRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendRequestStatus | EnumFriendRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendRequestStatus[] | ListEnumFriendRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendRequestStatus[] | ListEnumFriendRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendRequestStatusFilter<$PrismaModel> | $Enums.FriendRequestStatus
  }

  export type NestedEnumFriendRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendRequestStatus | EnumFriendRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendRequestStatus[] | ListEnumFriendRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendRequestStatus[] | ListEnumFriendRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.FriendRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFriendRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumFriendRequestStatusFilter<$PrismaModel>
  }

  export type ServerCreateWithoutProfileInput = {
    id?: string
    name: string
    imageUrl: string
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberCreateNestedManyWithoutServerInput
    channels?: ChannelCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutProfileInput = {
    id?: string
    name: string
    imageUrl: string
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberUncheckedCreateNestedManyWithoutServerInput
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutProfileInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutProfileInput, ServerUncheckedCreateWithoutProfileInput>
  }

  export type ServerCreateManyProfileInputEnvelope = {
    data: ServerCreateManyProfileInput | ServerCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type MemberCreateWithoutProfileInput = {
    id?: string
    role?: $Enums.MemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
    server: ServerCreateNestedOneWithoutMembersInput
    conversationsInitiated?: ConversationCreateNestedManyWithoutMemberOneInput
    conversationsReceived?: ConversationCreateNestedManyWithoutMemberTwoInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutMemberInput
    groupMessages?: GroupMessageCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutProfileInput = {
    id?: string
    role?: $Enums.MemberRole
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversationsInitiated?: ConversationUncheckedCreateNestedManyWithoutMemberOneInput
    conversationsReceived?: ConversationUncheckedCreateNestedManyWithoutMemberTwoInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutMemberInput
    groupMessages?: GroupMessageUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutProfileInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutProfileInput, MemberUncheckedCreateWithoutProfileInput>
  }

  export type MemberCreateManyProfileInputEnvelope = {
    data: MemberCreateManyProfileInput | MemberCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type ChannelCreateWithoutProfileInput = {
    id?: string
    name: string
    type?: $Enums.ChannelType
    createdAt?: Date | string
    updatedAt?: Date | string
    server: ServerCreateNestedOneWithoutChannelsInput
  }

  export type ChannelUncheckedCreateWithoutProfileInput = {
    id?: string
    name: string
    type?: $Enums.ChannelType
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChannelCreateOrConnectWithoutProfileInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutProfileInput, ChannelUncheckedCreateWithoutProfileInput>
  }

  export type ChannelCreateManyProfileInputEnvelope = {
    data: ChannelCreateManyProfileInput | ChannelCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type ConversationCreateWithoutProfileInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberOne: MemberCreateNestedOneWithoutConversationsInitiatedInput
    memberTwo: MemberCreateNestedOneWithoutConversationsReceivedInput
  }

  export type ConversationUncheckedCreateWithoutProfileInput = {
    id?: string
    memberOneId: string
    memberTwoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationCreateOrConnectWithoutProfileInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutProfileInput, ConversationUncheckedCreateWithoutProfileInput>
  }

  export type ConversationCreateManyProfileInputEnvelope = {
    data: ConversationCreateManyProfileInput | ConversationCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type GroupConversationMemberCreateWithoutProfileInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutGroupConversationsInput
    groupConversation: GroupConversationCreateNestedOneWithoutMembersInput
  }

  export type GroupConversationMemberUncheckedCreateWithoutProfileInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    memberId: string
    groupConversationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupConversationMemberCreateOrConnectWithoutProfileInput = {
    where: GroupConversationMemberWhereUniqueInput
    create: XOR<GroupConversationMemberCreateWithoutProfileInput, GroupConversationMemberUncheckedCreateWithoutProfileInput>
  }

  export type GroupConversationMemberCreateManyProfileInputEnvelope = {
    data: GroupConversationMemberCreateManyProfileInput | GroupConversationMemberCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type GroupConversationCreateWithoutProfileInput = {
    id?: string
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: GroupConversationMemberCreateNestedManyWithoutGroupConversationInput
    messages?: GroupMessageCreateNestedManyWithoutGroupConversationInput
  }

  export type GroupConversationUncheckedCreateWithoutProfileInput = {
    id?: string
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: GroupConversationMemberUncheckedCreateNestedManyWithoutGroupConversationInput
    messages?: GroupMessageUncheckedCreateNestedManyWithoutGroupConversationInput
  }

  export type GroupConversationCreateOrConnectWithoutProfileInput = {
    where: GroupConversationWhereUniqueInput
    create: XOR<GroupConversationCreateWithoutProfileInput, GroupConversationUncheckedCreateWithoutProfileInput>
  }

  export type GroupConversationCreateManyProfileInputEnvelope = {
    data: GroupConversationCreateManyProfileInput | GroupConversationCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type FriendRequestCreateWithoutRequesterProfileInput = {
    id?: string
    status?: $Enums.FriendRequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    targetProfile: ProfileCreateNestedOneWithoutFriendRequestsReceivedInput
  }

  export type FriendRequestUncheckedCreateWithoutRequesterProfileInput = {
    id?: string
    targetProfileId: string
    status?: $Enums.FriendRequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendRequestCreateOrConnectWithoutRequesterProfileInput = {
    where: FriendRequestWhereUniqueInput
    create: XOR<FriendRequestCreateWithoutRequesterProfileInput, FriendRequestUncheckedCreateWithoutRequesterProfileInput>
  }

  export type FriendRequestCreateManyRequesterProfileInputEnvelope = {
    data: FriendRequestCreateManyRequesterProfileInput | FriendRequestCreateManyRequesterProfileInput[]
    skipDuplicates?: boolean
  }

  export type FriendRequestCreateWithoutTargetProfileInput = {
    id?: string
    status?: $Enums.FriendRequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    requesterProfile: ProfileCreateNestedOneWithoutFriendRequestsSentInput
  }

  export type FriendRequestUncheckedCreateWithoutTargetProfileInput = {
    id?: string
    requesterProfileId: string
    status?: $Enums.FriendRequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendRequestCreateOrConnectWithoutTargetProfileInput = {
    where: FriendRequestWhereUniqueInput
    create: XOR<FriendRequestCreateWithoutTargetProfileInput, FriendRequestUncheckedCreateWithoutTargetProfileInput>
  }

  export type FriendRequestCreateManyTargetProfileInputEnvelope = {
    data: FriendRequestCreateManyTargetProfileInput | FriendRequestCreateManyTargetProfileInput[]
    skipDuplicates?: boolean
  }

  export type ServerUpsertWithWhereUniqueWithoutProfileInput = {
    where: ServerWhereUniqueInput
    update: XOR<ServerUpdateWithoutProfileInput, ServerUncheckedUpdateWithoutProfileInput>
    create: XOR<ServerCreateWithoutProfileInput, ServerUncheckedCreateWithoutProfileInput>
  }

  export type ServerUpdateWithWhereUniqueWithoutProfileInput = {
    where: ServerWhereUniqueInput
    data: XOR<ServerUpdateWithoutProfileInput, ServerUncheckedUpdateWithoutProfileInput>
  }

  export type ServerUpdateManyWithWhereWithoutProfileInput = {
    where: ServerScalarWhereInput
    data: XOR<ServerUpdateManyMutationInput, ServerUncheckedUpdateManyWithoutProfileInput>
  }

  export type ServerScalarWhereInput = {
    AND?: ServerScalarWhereInput | ServerScalarWhereInput[]
    OR?: ServerScalarWhereInput[]
    NOT?: ServerScalarWhereInput | ServerScalarWhereInput[]
    id?: StringFilter<"Server"> | string
    name?: StringFilter<"Server"> | string
    imageUrl?: StringFilter<"Server"> | string
    inviteCode?: StringFilter<"Server"> | string
    profileId?: StringFilter<"Server"> | string
    createdAt?: DateTimeFilter<"Server"> | Date | string
    updatedAt?: DateTimeFilter<"Server"> | Date | string
  }

  export type MemberUpsertWithWhereUniqueWithoutProfileInput = {
    where: MemberWhereUniqueInput
    update: XOR<MemberUpdateWithoutProfileInput, MemberUncheckedUpdateWithoutProfileInput>
    create: XOR<MemberCreateWithoutProfileInput, MemberUncheckedCreateWithoutProfileInput>
  }

  export type MemberUpdateWithWhereUniqueWithoutProfileInput = {
    where: MemberWhereUniqueInput
    data: XOR<MemberUpdateWithoutProfileInput, MemberUncheckedUpdateWithoutProfileInput>
  }

  export type MemberUpdateManyWithWhereWithoutProfileInput = {
    where: MemberScalarWhereInput
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyWithoutProfileInput>
  }

  export type MemberScalarWhereInput = {
    AND?: MemberScalarWhereInput | MemberScalarWhereInput[]
    OR?: MemberScalarWhereInput[]
    NOT?: MemberScalarWhereInput | MemberScalarWhereInput[]
    id?: StringFilter<"Member"> | string
    role?: EnumMemberRoleFilter<"Member"> | $Enums.MemberRole
    profileId?: StringFilter<"Member"> | string
    serverId?: StringFilter<"Member"> | string
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
  }

  export type ChannelUpsertWithWhereUniqueWithoutProfileInput = {
    where: ChannelWhereUniqueInput
    update: XOR<ChannelUpdateWithoutProfileInput, ChannelUncheckedUpdateWithoutProfileInput>
    create: XOR<ChannelCreateWithoutProfileInput, ChannelUncheckedCreateWithoutProfileInput>
  }

  export type ChannelUpdateWithWhereUniqueWithoutProfileInput = {
    where: ChannelWhereUniqueInput
    data: XOR<ChannelUpdateWithoutProfileInput, ChannelUncheckedUpdateWithoutProfileInput>
  }

  export type ChannelUpdateManyWithWhereWithoutProfileInput = {
    where: ChannelScalarWhereInput
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyWithoutProfileInput>
  }

  export type ChannelScalarWhereInput = {
    AND?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
    OR?: ChannelScalarWhereInput[]
    NOT?: ChannelScalarWhereInput | ChannelScalarWhereInput[]
    id?: StringFilter<"Channel"> | string
    name?: StringFilter<"Channel"> | string
    type?: EnumChannelTypeFilter<"Channel"> | $Enums.ChannelType
    profileId?: StringFilter<"Channel"> | string
    serverId?: StringFilter<"Channel"> | string
    createdAt?: DateTimeFilter<"Channel"> | Date | string
    updatedAt?: DateTimeFilter<"Channel"> | Date | string
  }

  export type ConversationUpsertWithWhereUniqueWithoutProfileInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutProfileInput, ConversationUncheckedUpdateWithoutProfileInput>
    create: XOR<ConversationCreateWithoutProfileInput, ConversationUncheckedCreateWithoutProfileInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutProfileInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutProfileInput, ConversationUncheckedUpdateWithoutProfileInput>
  }

  export type ConversationUpdateManyWithWhereWithoutProfileInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutProfileInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    memberOneId?: StringFilter<"Conversation"> | string
    memberTwoId?: StringFilter<"Conversation"> | string
    profileId?: StringFilter<"Conversation"> | string
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
  }

  export type GroupConversationMemberUpsertWithWhereUniqueWithoutProfileInput = {
    where: GroupConversationMemberWhereUniqueInput
    update: XOR<GroupConversationMemberUpdateWithoutProfileInput, GroupConversationMemberUncheckedUpdateWithoutProfileInput>
    create: XOR<GroupConversationMemberCreateWithoutProfileInput, GroupConversationMemberUncheckedCreateWithoutProfileInput>
  }

  export type GroupConversationMemberUpdateWithWhereUniqueWithoutProfileInput = {
    where: GroupConversationMemberWhereUniqueInput
    data: XOR<GroupConversationMemberUpdateWithoutProfileInput, GroupConversationMemberUncheckedUpdateWithoutProfileInput>
  }

  export type GroupConversationMemberUpdateManyWithWhereWithoutProfileInput = {
    where: GroupConversationMemberScalarWhereInput
    data: XOR<GroupConversationMemberUpdateManyMutationInput, GroupConversationMemberUncheckedUpdateManyWithoutProfileInput>
  }

  export type GroupConversationMemberScalarWhereInput = {
    AND?: GroupConversationMemberScalarWhereInput | GroupConversationMemberScalarWhereInput[]
    OR?: GroupConversationMemberScalarWhereInput[]
    NOT?: GroupConversationMemberScalarWhereInput | GroupConversationMemberScalarWhereInput[]
    id?: StringFilter<"GroupConversationMember"> | string
    role?: EnumGroupMemberRoleFilter<"GroupConversationMember"> | $Enums.GroupMemberRole
    profileId?: StringFilter<"GroupConversationMember"> | string
    memberId?: StringFilter<"GroupConversationMember"> | string
    groupConversationId?: StringFilter<"GroupConversationMember"> | string
    createdAt?: DateTimeFilter<"GroupConversationMember"> | Date | string
    updatedAt?: DateTimeFilter<"GroupConversationMember"> | Date | string
  }

  export type GroupConversationUpsertWithWhereUniqueWithoutProfileInput = {
    where: GroupConversationWhereUniqueInput
    update: XOR<GroupConversationUpdateWithoutProfileInput, GroupConversationUncheckedUpdateWithoutProfileInput>
    create: XOR<GroupConversationCreateWithoutProfileInput, GroupConversationUncheckedCreateWithoutProfileInput>
  }

  export type GroupConversationUpdateWithWhereUniqueWithoutProfileInput = {
    where: GroupConversationWhereUniqueInput
    data: XOR<GroupConversationUpdateWithoutProfileInput, GroupConversationUncheckedUpdateWithoutProfileInput>
  }

  export type GroupConversationUpdateManyWithWhereWithoutProfileInput = {
    where: GroupConversationScalarWhereInput
    data: XOR<GroupConversationUpdateManyMutationInput, GroupConversationUncheckedUpdateManyWithoutProfileInput>
  }

  export type GroupConversationScalarWhereInput = {
    AND?: GroupConversationScalarWhereInput | GroupConversationScalarWhereInput[]
    OR?: GroupConversationScalarWhereInput[]
    NOT?: GroupConversationScalarWhereInput | GroupConversationScalarWhereInput[]
    id?: StringFilter<"GroupConversation"> | string
    name?: StringFilter<"GroupConversation"> | string
    imageUrl?: StringNullableFilter<"GroupConversation"> | string | null
    profileId?: StringFilter<"GroupConversation"> | string
    createdAt?: DateTimeFilter<"GroupConversation"> | Date | string
    updatedAt?: DateTimeFilter<"GroupConversation"> | Date | string
  }

  export type FriendRequestUpsertWithWhereUniqueWithoutRequesterProfileInput = {
    where: FriendRequestWhereUniqueInput
    update: XOR<FriendRequestUpdateWithoutRequesterProfileInput, FriendRequestUncheckedUpdateWithoutRequesterProfileInput>
    create: XOR<FriendRequestCreateWithoutRequesterProfileInput, FriendRequestUncheckedCreateWithoutRequesterProfileInput>
  }

  export type FriendRequestUpdateWithWhereUniqueWithoutRequesterProfileInput = {
    where: FriendRequestWhereUniqueInput
    data: XOR<FriendRequestUpdateWithoutRequesterProfileInput, FriendRequestUncheckedUpdateWithoutRequesterProfileInput>
  }

  export type FriendRequestUpdateManyWithWhereWithoutRequesterProfileInput = {
    where: FriendRequestScalarWhereInput
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyWithoutRequesterProfileInput>
  }

  export type FriendRequestScalarWhereInput = {
    AND?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
    OR?: FriendRequestScalarWhereInput[]
    NOT?: FriendRequestScalarWhereInput | FriendRequestScalarWhereInput[]
    id?: StringFilter<"FriendRequest"> | string
    requesterProfileId?: StringFilter<"FriendRequest"> | string
    targetProfileId?: StringFilter<"FriendRequest"> | string
    status?: EnumFriendRequestStatusFilter<"FriendRequest"> | $Enums.FriendRequestStatus
    createdAt?: DateTimeFilter<"FriendRequest"> | Date | string
    updatedAt?: DateTimeFilter<"FriendRequest"> | Date | string
  }

  export type FriendRequestUpsertWithWhereUniqueWithoutTargetProfileInput = {
    where: FriendRequestWhereUniqueInput
    update: XOR<FriendRequestUpdateWithoutTargetProfileInput, FriendRequestUncheckedUpdateWithoutTargetProfileInput>
    create: XOR<FriendRequestCreateWithoutTargetProfileInput, FriendRequestUncheckedCreateWithoutTargetProfileInput>
  }

  export type FriendRequestUpdateWithWhereUniqueWithoutTargetProfileInput = {
    where: FriendRequestWhereUniqueInput
    data: XOR<FriendRequestUpdateWithoutTargetProfileInput, FriendRequestUncheckedUpdateWithoutTargetProfileInput>
  }

  export type FriendRequestUpdateManyWithWhereWithoutTargetProfileInput = {
    where: FriendRequestScalarWhereInput
    data: XOR<FriendRequestUpdateManyMutationInput, FriendRequestUncheckedUpdateManyWithoutTargetProfileInput>
  }

  export type ProfileCreateWithoutServersInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberCreateNestedManyWithoutProfileInput
    channels?: ChannelCreateNestedManyWithoutProfileInput
    conversations?: ConversationCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileUncheckedCreateWithoutServersInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberUncheckedCreateNestedManyWithoutProfileInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProfileInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationUncheckedCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestUncheckedCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestUncheckedCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileCreateOrConnectWithoutServersInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutServersInput, ProfileUncheckedCreateWithoutServersInput>
  }

  export type MemberCreateWithoutServerInput = {
    id?: string
    role?: $Enums.MemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutMembersInput
    conversationsInitiated?: ConversationCreateNestedManyWithoutMemberOneInput
    conversationsReceived?: ConversationCreateNestedManyWithoutMemberTwoInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutMemberInput
    groupMessages?: GroupMessageCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutServerInput = {
    id?: string
    role?: $Enums.MemberRole
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversationsInitiated?: ConversationUncheckedCreateNestedManyWithoutMemberOneInput
    conversationsReceived?: ConversationUncheckedCreateNestedManyWithoutMemberTwoInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutMemberInput
    groupMessages?: GroupMessageUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutServerInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutServerInput, MemberUncheckedCreateWithoutServerInput>
  }

  export type MemberCreateManyServerInputEnvelope = {
    data: MemberCreateManyServerInput | MemberCreateManyServerInput[]
    skipDuplicates?: boolean
  }

  export type ChannelCreateWithoutServerInput = {
    id?: string
    name: string
    type?: $Enums.ChannelType
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutChannelsInput
  }

  export type ChannelUncheckedCreateWithoutServerInput = {
    id?: string
    name: string
    type?: $Enums.ChannelType
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChannelCreateOrConnectWithoutServerInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput>
  }

  export type ChannelCreateManyServerInputEnvelope = {
    data: ChannelCreateManyServerInput | ChannelCreateManyServerInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutServersInput = {
    update: XOR<ProfileUpdateWithoutServersInput, ProfileUncheckedUpdateWithoutServersInput>
    create: XOR<ProfileCreateWithoutServersInput, ProfileUncheckedCreateWithoutServersInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutServersInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutServersInput, ProfileUncheckedUpdateWithoutServersInput>
  }

  export type ProfileUpdateWithoutServersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUpdateManyWithoutProfileNestedInput
    channels?: ChannelUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUpdateManyWithoutTargetProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutServersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUncheckedUpdateManyWithoutProfileNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUncheckedUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUncheckedUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUncheckedUpdateManyWithoutTargetProfileNestedInput
  }

  export type MemberUpsertWithWhereUniqueWithoutServerInput = {
    where: MemberWhereUniqueInput
    update: XOR<MemberUpdateWithoutServerInput, MemberUncheckedUpdateWithoutServerInput>
    create: XOR<MemberCreateWithoutServerInput, MemberUncheckedCreateWithoutServerInput>
  }

  export type MemberUpdateWithWhereUniqueWithoutServerInput = {
    where: MemberWhereUniqueInput
    data: XOR<MemberUpdateWithoutServerInput, MemberUncheckedUpdateWithoutServerInput>
  }

  export type MemberUpdateManyWithWhereWithoutServerInput = {
    where: MemberScalarWhereInput
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyWithoutServerInput>
  }

  export type ChannelUpsertWithWhereUniqueWithoutServerInput = {
    where: ChannelWhereUniqueInput
    update: XOR<ChannelUpdateWithoutServerInput, ChannelUncheckedUpdateWithoutServerInput>
    create: XOR<ChannelCreateWithoutServerInput, ChannelUncheckedCreateWithoutServerInput>
  }

  export type ChannelUpdateWithWhereUniqueWithoutServerInput = {
    where: ChannelWhereUniqueInput
    data: XOR<ChannelUpdateWithoutServerInput, ChannelUncheckedUpdateWithoutServerInput>
  }

  export type ChannelUpdateManyWithWhereWithoutServerInput = {
    where: ChannelScalarWhereInput
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyWithoutServerInput>
  }

  export type ProfileCreateWithoutMembersInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerCreateNestedManyWithoutProfileInput
    channels?: ChannelCreateNestedManyWithoutProfileInput
    conversations?: ConversationCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileUncheckedCreateWithoutMembersInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerUncheckedCreateNestedManyWithoutProfileInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProfileInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationUncheckedCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestUncheckedCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestUncheckedCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileCreateOrConnectWithoutMembersInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutMembersInput, ProfileUncheckedCreateWithoutMembersInput>
  }

  export type ServerCreateWithoutMembersInput = {
    id?: string
    name: string
    imageUrl: string
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutServersInput
    channels?: ChannelCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    imageUrl: string
    inviteCode: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    channels?: ChannelUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutMembersInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
  }

  export type ConversationCreateWithoutMemberOneInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberTwo: MemberCreateNestedOneWithoutConversationsReceivedInput
    profile: ProfileCreateNestedOneWithoutConversationsInput
  }

  export type ConversationUncheckedCreateWithoutMemberOneInput = {
    id?: string
    memberTwoId: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationCreateOrConnectWithoutMemberOneInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMemberOneInput, ConversationUncheckedCreateWithoutMemberOneInput>
  }

  export type ConversationCreateManyMemberOneInputEnvelope = {
    data: ConversationCreateManyMemberOneInput | ConversationCreateManyMemberOneInput[]
    skipDuplicates?: boolean
  }

  export type ConversationCreateWithoutMemberTwoInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberOne: MemberCreateNestedOneWithoutConversationsInitiatedInput
    profile: ProfileCreateNestedOneWithoutConversationsInput
  }

  export type ConversationUncheckedCreateWithoutMemberTwoInput = {
    id?: string
    memberOneId: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationCreateOrConnectWithoutMemberTwoInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMemberTwoInput, ConversationUncheckedCreateWithoutMemberTwoInput>
  }

  export type ConversationCreateManyMemberTwoInputEnvelope = {
    data: ConversationCreateManyMemberTwoInput | ConversationCreateManyMemberTwoInput[]
    skipDuplicates?: boolean
  }

  export type GroupConversationMemberCreateWithoutMemberInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutGroupConversationsInput
    groupConversation: GroupConversationCreateNestedOneWithoutMembersInput
  }

  export type GroupConversationMemberUncheckedCreateWithoutMemberInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    profileId: string
    groupConversationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupConversationMemberCreateOrConnectWithoutMemberInput = {
    where: GroupConversationMemberWhereUniqueInput
    create: XOR<GroupConversationMemberCreateWithoutMemberInput, GroupConversationMemberUncheckedCreateWithoutMemberInput>
  }

  export type GroupConversationMemberCreateManyMemberInputEnvelope = {
    data: GroupConversationMemberCreateManyMemberInput | GroupConversationMemberCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type GroupMessageCreateWithoutMemberInput = {
    id?: string
    content: string
    fileUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    groupConversation: GroupConversationCreateNestedOneWithoutMessagesInput
  }

  export type GroupMessageUncheckedCreateWithoutMemberInput = {
    id?: string
    content: string
    fileUrl?: string | null
    deleted?: boolean
    groupConversationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMessageCreateOrConnectWithoutMemberInput = {
    where: GroupMessageWhereUniqueInput
    create: XOR<GroupMessageCreateWithoutMemberInput, GroupMessageUncheckedCreateWithoutMemberInput>
  }

  export type GroupMessageCreateManyMemberInputEnvelope = {
    data: GroupMessageCreateManyMemberInput | GroupMessageCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutMembersInput = {
    update: XOR<ProfileUpdateWithoutMembersInput, ProfileUncheckedUpdateWithoutMembersInput>
    create: XOR<ProfileCreateWithoutMembersInput, ProfileUncheckedCreateWithoutMembersInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutMembersInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutMembersInput, ProfileUncheckedUpdateWithoutMembersInput>
  }

  export type ProfileUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUpdateManyWithoutProfileNestedInput
    channels?: ChannelUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUpdateManyWithoutTargetProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUncheckedUpdateManyWithoutProfileNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUncheckedUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUncheckedUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUncheckedUpdateManyWithoutTargetProfileNestedInput
  }

  export type ServerUpsertWithoutMembersInput = {
    update: XOR<ServerUpdateWithoutMembersInput, ServerUncheckedUpdateWithoutMembersInput>
    create: XOR<ServerCreateWithoutMembersInput, ServerUncheckedCreateWithoutMembersInput>
    where?: ServerWhereInput
  }

  export type ServerUpdateToOneWithWhereWithoutMembersInput = {
    where?: ServerWhereInput
    data: XOR<ServerUpdateWithoutMembersInput, ServerUncheckedUpdateWithoutMembersInput>
  }

  export type ServerUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutServersNestedInput
    channels?: ChannelUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
  }

  export type ConversationUpsertWithWhereUniqueWithoutMemberOneInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutMemberOneInput, ConversationUncheckedUpdateWithoutMemberOneInput>
    create: XOR<ConversationCreateWithoutMemberOneInput, ConversationUncheckedCreateWithoutMemberOneInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutMemberOneInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutMemberOneInput, ConversationUncheckedUpdateWithoutMemberOneInput>
  }

  export type ConversationUpdateManyWithWhereWithoutMemberOneInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutMemberOneInput>
  }

  export type ConversationUpsertWithWhereUniqueWithoutMemberTwoInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutMemberTwoInput, ConversationUncheckedUpdateWithoutMemberTwoInput>
    create: XOR<ConversationCreateWithoutMemberTwoInput, ConversationUncheckedCreateWithoutMemberTwoInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutMemberTwoInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutMemberTwoInput, ConversationUncheckedUpdateWithoutMemberTwoInput>
  }

  export type ConversationUpdateManyWithWhereWithoutMemberTwoInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutMemberTwoInput>
  }

  export type GroupConversationMemberUpsertWithWhereUniqueWithoutMemberInput = {
    where: GroupConversationMemberWhereUniqueInput
    update: XOR<GroupConversationMemberUpdateWithoutMemberInput, GroupConversationMemberUncheckedUpdateWithoutMemberInput>
    create: XOR<GroupConversationMemberCreateWithoutMemberInput, GroupConversationMemberUncheckedCreateWithoutMemberInput>
  }

  export type GroupConversationMemberUpdateWithWhereUniqueWithoutMemberInput = {
    where: GroupConversationMemberWhereUniqueInput
    data: XOR<GroupConversationMemberUpdateWithoutMemberInput, GroupConversationMemberUncheckedUpdateWithoutMemberInput>
  }

  export type GroupConversationMemberUpdateManyWithWhereWithoutMemberInput = {
    where: GroupConversationMemberScalarWhereInput
    data: XOR<GroupConversationMemberUpdateManyMutationInput, GroupConversationMemberUncheckedUpdateManyWithoutMemberInput>
  }

  export type GroupMessageUpsertWithWhereUniqueWithoutMemberInput = {
    where: GroupMessageWhereUniqueInput
    update: XOR<GroupMessageUpdateWithoutMemberInput, GroupMessageUncheckedUpdateWithoutMemberInput>
    create: XOR<GroupMessageCreateWithoutMemberInput, GroupMessageUncheckedCreateWithoutMemberInput>
  }

  export type GroupMessageUpdateWithWhereUniqueWithoutMemberInput = {
    where: GroupMessageWhereUniqueInput
    data: XOR<GroupMessageUpdateWithoutMemberInput, GroupMessageUncheckedUpdateWithoutMemberInput>
  }

  export type GroupMessageUpdateManyWithWhereWithoutMemberInput = {
    where: GroupMessageScalarWhereInput
    data: XOR<GroupMessageUpdateManyMutationInput, GroupMessageUncheckedUpdateManyWithoutMemberInput>
  }

  export type GroupMessageScalarWhereInput = {
    AND?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
    OR?: GroupMessageScalarWhereInput[]
    NOT?: GroupMessageScalarWhereInput | GroupMessageScalarWhereInput[]
    id?: StringFilter<"GroupMessage"> | string
    content?: StringFilter<"GroupMessage"> | string
    fileUrl?: StringNullableFilter<"GroupMessage"> | string | null
    deleted?: BoolFilter<"GroupMessage"> | boolean
    memberId?: StringFilter<"GroupMessage"> | string
    groupConversationId?: StringFilter<"GroupMessage"> | string
    createdAt?: DateTimeFilter<"GroupMessage"> | Date | string
    updatedAt?: DateTimeFilter<"GroupMessage"> | Date | string
  }

  export type ProfileCreateWithoutChannelsInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerCreateNestedManyWithoutProfileInput
    members?: MemberCreateNestedManyWithoutProfileInput
    conversations?: ConversationCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileUncheckedCreateWithoutChannelsInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerUncheckedCreateNestedManyWithoutProfileInput
    members?: MemberUncheckedCreateNestedManyWithoutProfileInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationUncheckedCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestUncheckedCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestUncheckedCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileCreateOrConnectWithoutChannelsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutChannelsInput, ProfileUncheckedCreateWithoutChannelsInput>
  }

  export type ServerCreateWithoutChannelsInput = {
    id?: string
    name: string
    imageUrl: string
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutServersInput
    members?: MemberCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutChannelsInput = {
    id?: string
    name: string
    imageUrl: string
    inviteCode: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutChannelsInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
  }

  export type ProfileUpsertWithoutChannelsInput = {
    update: XOR<ProfileUpdateWithoutChannelsInput, ProfileUncheckedUpdateWithoutChannelsInput>
    create: XOR<ProfileCreateWithoutChannelsInput, ProfileUncheckedCreateWithoutChannelsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutChannelsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutChannelsInput, ProfileUncheckedUpdateWithoutChannelsInput>
  }

  export type ProfileUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUpdateManyWithoutProfileNestedInput
    members?: MemberUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUpdateManyWithoutTargetProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUncheckedUpdateManyWithoutProfileNestedInput
    members?: MemberUncheckedUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUncheckedUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUncheckedUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUncheckedUpdateManyWithoutTargetProfileNestedInput
  }

  export type ServerUpsertWithoutChannelsInput = {
    update: XOR<ServerUpdateWithoutChannelsInput, ServerUncheckedUpdateWithoutChannelsInput>
    create: XOR<ServerCreateWithoutChannelsInput, ServerUncheckedCreateWithoutChannelsInput>
    where?: ServerWhereInput
  }

  export type ServerUpdateToOneWithWhereWithoutChannelsInput = {
    where?: ServerWhereInput
    data: XOR<ServerUpdateWithoutChannelsInput, ServerUncheckedUpdateWithoutChannelsInput>
  }

  export type ServerUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutServersNestedInput
    members?: MemberUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUncheckedUpdateManyWithoutServerNestedInput
  }

  export type MemberCreateWithoutConversationsInitiatedInput = {
    id?: string
    role?: $Enums.MemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutMembersInput
    server: ServerCreateNestedOneWithoutMembersInput
    conversationsReceived?: ConversationCreateNestedManyWithoutMemberTwoInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutMemberInput
    groupMessages?: GroupMessageCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutConversationsInitiatedInput = {
    id?: string
    role?: $Enums.MemberRole
    profileId: string
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversationsReceived?: ConversationUncheckedCreateNestedManyWithoutMemberTwoInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutMemberInput
    groupMessages?: GroupMessageUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutConversationsInitiatedInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutConversationsInitiatedInput, MemberUncheckedCreateWithoutConversationsInitiatedInput>
  }

  export type MemberCreateWithoutConversationsReceivedInput = {
    id?: string
    role?: $Enums.MemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutMembersInput
    server: ServerCreateNestedOneWithoutMembersInput
    conversationsInitiated?: ConversationCreateNestedManyWithoutMemberOneInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutMemberInput
    groupMessages?: GroupMessageCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutConversationsReceivedInput = {
    id?: string
    role?: $Enums.MemberRole
    profileId: string
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversationsInitiated?: ConversationUncheckedCreateNestedManyWithoutMemberOneInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutMemberInput
    groupMessages?: GroupMessageUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutConversationsReceivedInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutConversationsReceivedInput, MemberUncheckedCreateWithoutConversationsReceivedInput>
  }

  export type ProfileCreateWithoutConversationsInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerCreateNestedManyWithoutProfileInput
    members?: MemberCreateNestedManyWithoutProfileInput
    channels?: ChannelCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileUncheckedCreateWithoutConversationsInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerUncheckedCreateNestedManyWithoutProfileInput
    members?: MemberUncheckedCreateNestedManyWithoutProfileInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationUncheckedCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestUncheckedCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestUncheckedCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileCreateOrConnectWithoutConversationsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutConversationsInput, ProfileUncheckedCreateWithoutConversationsInput>
  }

  export type MemberUpsertWithoutConversationsInitiatedInput = {
    update: XOR<MemberUpdateWithoutConversationsInitiatedInput, MemberUncheckedUpdateWithoutConversationsInitiatedInput>
    create: XOR<MemberCreateWithoutConversationsInitiatedInput, MemberUncheckedCreateWithoutConversationsInitiatedInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutConversationsInitiatedInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutConversationsInitiatedInput, MemberUncheckedUpdateWithoutConversationsInitiatedInput>
  }

  export type MemberUpdateWithoutConversationsInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutMembersNestedInput
    server?: ServerUpdateOneRequiredWithoutMembersNestedInput
    conversationsReceived?: ConversationUpdateManyWithoutMemberTwoNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutMemberNestedInput
    groupMessages?: GroupMessageUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutConversationsInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationsReceived?: ConversationUncheckedUpdateManyWithoutMemberTwoNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutMemberNestedInput
    groupMessages?: GroupMessageUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberUpsertWithoutConversationsReceivedInput = {
    update: XOR<MemberUpdateWithoutConversationsReceivedInput, MemberUncheckedUpdateWithoutConversationsReceivedInput>
    create: XOR<MemberCreateWithoutConversationsReceivedInput, MemberUncheckedCreateWithoutConversationsReceivedInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutConversationsReceivedInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutConversationsReceivedInput, MemberUncheckedUpdateWithoutConversationsReceivedInput>
  }

  export type MemberUpdateWithoutConversationsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutMembersNestedInput
    server?: ServerUpdateOneRequiredWithoutMembersNestedInput
    conversationsInitiated?: ConversationUpdateManyWithoutMemberOneNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutMemberNestedInput
    groupMessages?: GroupMessageUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutConversationsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationsInitiated?: ConversationUncheckedUpdateManyWithoutMemberOneNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutMemberNestedInput
    groupMessages?: GroupMessageUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type ProfileUpsertWithoutConversationsInput = {
    update: XOR<ProfileUpdateWithoutConversationsInput, ProfileUncheckedUpdateWithoutConversationsInput>
    create: XOR<ProfileCreateWithoutConversationsInput, ProfileUncheckedCreateWithoutConversationsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutConversationsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutConversationsInput, ProfileUncheckedUpdateWithoutConversationsInput>
  }

  export type ProfileUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUpdateManyWithoutProfileNestedInput
    members?: MemberUpdateManyWithoutProfileNestedInput
    channels?: ChannelUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUpdateManyWithoutTargetProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUncheckedUpdateManyWithoutProfileNestedInput
    members?: MemberUncheckedUpdateManyWithoutProfileNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUncheckedUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUncheckedUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUncheckedUpdateManyWithoutTargetProfileNestedInput
  }

  export type ProfileCreateWithoutGroupConversationsCreatedInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerCreateNestedManyWithoutProfileInput
    members?: MemberCreateNestedManyWithoutProfileInput
    channels?: ChannelCreateNestedManyWithoutProfileInput
    conversations?: ConversationCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileUncheckedCreateWithoutGroupConversationsCreatedInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerUncheckedCreateNestedManyWithoutProfileInput
    members?: MemberUncheckedCreateNestedManyWithoutProfileInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProfileInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestUncheckedCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestUncheckedCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileCreateOrConnectWithoutGroupConversationsCreatedInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutGroupConversationsCreatedInput, ProfileUncheckedCreateWithoutGroupConversationsCreatedInput>
  }

  export type GroupConversationMemberCreateWithoutGroupConversationInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutGroupConversationsInput
    member: MemberCreateNestedOneWithoutGroupConversationsInput
  }

  export type GroupConversationMemberUncheckedCreateWithoutGroupConversationInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    profileId: string
    memberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupConversationMemberCreateOrConnectWithoutGroupConversationInput = {
    where: GroupConversationMemberWhereUniqueInput
    create: XOR<GroupConversationMemberCreateWithoutGroupConversationInput, GroupConversationMemberUncheckedCreateWithoutGroupConversationInput>
  }

  export type GroupConversationMemberCreateManyGroupConversationInputEnvelope = {
    data: GroupConversationMemberCreateManyGroupConversationInput | GroupConversationMemberCreateManyGroupConversationInput[]
    skipDuplicates?: boolean
  }

  export type GroupMessageCreateWithoutGroupConversationInput = {
    id?: string
    content: string
    fileUrl?: string | null
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutGroupMessagesInput
  }

  export type GroupMessageUncheckedCreateWithoutGroupConversationInput = {
    id?: string
    content: string
    fileUrl?: string | null
    deleted?: boolean
    memberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMessageCreateOrConnectWithoutGroupConversationInput = {
    where: GroupMessageWhereUniqueInput
    create: XOR<GroupMessageCreateWithoutGroupConversationInput, GroupMessageUncheckedCreateWithoutGroupConversationInput>
  }

  export type GroupMessageCreateManyGroupConversationInputEnvelope = {
    data: GroupMessageCreateManyGroupConversationInput | GroupMessageCreateManyGroupConversationInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutGroupConversationsCreatedInput = {
    update: XOR<ProfileUpdateWithoutGroupConversationsCreatedInput, ProfileUncheckedUpdateWithoutGroupConversationsCreatedInput>
    create: XOR<ProfileCreateWithoutGroupConversationsCreatedInput, ProfileUncheckedCreateWithoutGroupConversationsCreatedInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutGroupConversationsCreatedInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutGroupConversationsCreatedInput, ProfileUncheckedUpdateWithoutGroupConversationsCreatedInput>
  }

  export type ProfileUpdateWithoutGroupConversationsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUpdateManyWithoutProfileNestedInput
    members?: MemberUpdateManyWithoutProfileNestedInput
    channels?: ChannelUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUpdateManyWithoutTargetProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutGroupConversationsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUncheckedUpdateManyWithoutProfileNestedInput
    members?: MemberUncheckedUpdateManyWithoutProfileNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUncheckedUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUncheckedUpdateManyWithoutTargetProfileNestedInput
  }

  export type GroupConversationMemberUpsertWithWhereUniqueWithoutGroupConversationInput = {
    where: GroupConversationMemberWhereUniqueInput
    update: XOR<GroupConversationMemberUpdateWithoutGroupConversationInput, GroupConversationMemberUncheckedUpdateWithoutGroupConversationInput>
    create: XOR<GroupConversationMemberCreateWithoutGroupConversationInput, GroupConversationMemberUncheckedCreateWithoutGroupConversationInput>
  }

  export type GroupConversationMemberUpdateWithWhereUniqueWithoutGroupConversationInput = {
    where: GroupConversationMemberWhereUniqueInput
    data: XOR<GroupConversationMemberUpdateWithoutGroupConversationInput, GroupConversationMemberUncheckedUpdateWithoutGroupConversationInput>
  }

  export type GroupConversationMemberUpdateManyWithWhereWithoutGroupConversationInput = {
    where: GroupConversationMemberScalarWhereInput
    data: XOR<GroupConversationMemberUpdateManyMutationInput, GroupConversationMemberUncheckedUpdateManyWithoutGroupConversationInput>
  }

  export type GroupMessageUpsertWithWhereUniqueWithoutGroupConversationInput = {
    where: GroupMessageWhereUniqueInput
    update: XOR<GroupMessageUpdateWithoutGroupConversationInput, GroupMessageUncheckedUpdateWithoutGroupConversationInput>
    create: XOR<GroupMessageCreateWithoutGroupConversationInput, GroupMessageUncheckedCreateWithoutGroupConversationInput>
  }

  export type GroupMessageUpdateWithWhereUniqueWithoutGroupConversationInput = {
    where: GroupMessageWhereUniqueInput
    data: XOR<GroupMessageUpdateWithoutGroupConversationInput, GroupMessageUncheckedUpdateWithoutGroupConversationInput>
  }

  export type GroupMessageUpdateManyWithWhereWithoutGroupConversationInput = {
    where: GroupMessageScalarWhereInput
    data: XOR<GroupMessageUpdateManyMutationInput, GroupMessageUncheckedUpdateManyWithoutGroupConversationInput>
  }

  export type ProfileCreateWithoutGroupConversationsInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerCreateNestedManyWithoutProfileInput
    members?: MemberCreateNestedManyWithoutProfileInput
    channels?: ChannelCreateNestedManyWithoutProfileInput
    conversations?: ConversationCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileUncheckedCreateWithoutGroupConversationsInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerUncheckedCreateNestedManyWithoutProfileInput
    members?: MemberUncheckedCreateNestedManyWithoutProfileInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProfileInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationUncheckedCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestUncheckedCreateNestedManyWithoutRequesterProfileInput
    friendRequestsReceived?: FriendRequestUncheckedCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileCreateOrConnectWithoutGroupConversationsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutGroupConversationsInput, ProfileUncheckedCreateWithoutGroupConversationsInput>
  }

  export type MemberCreateWithoutGroupConversationsInput = {
    id?: string
    role?: $Enums.MemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutMembersInput
    server: ServerCreateNestedOneWithoutMembersInput
    conversationsInitiated?: ConversationCreateNestedManyWithoutMemberOneInput
    conversationsReceived?: ConversationCreateNestedManyWithoutMemberTwoInput
    groupMessages?: GroupMessageCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutGroupConversationsInput = {
    id?: string
    role?: $Enums.MemberRole
    profileId: string
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversationsInitiated?: ConversationUncheckedCreateNestedManyWithoutMemberOneInput
    conversationsReceived?: ConversationUncheckedCreateNestedManyWithoutMemberTwoInput
    groupMessages?: GroupMessageUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutGroupConversationsInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutGroupConversationsInput, MemberUncheckedCreateWithoutGroupConversationsInput>
  }

  export type GroupConversationCreateWithoutMembersInput = {
    id?: string
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutGroupConversationsCreatedInput
    messages?: GroupMessageCreateNestedManyWithoutGroupConversationInput
  }

  export type GroupConversationUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    imageUrl?: string | null
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: GroupMessageUncheckedCreateNestedManyWithoutGroupConversationInput
  }

  export type GroupConversationCreateOrConnectWithoutMembersInput = {
    where: GroupConversationWhereUniqueInput
    create: XOR<GroupConversationCreateWithoutMembersInput, GroupConversationUncheckedCreateWithoutMembersInput>
  }

  export type ProfileUpsertWithoutGroupConversationsInput = {
    update: XOR<ProfileUpdateWithoutGroupConversationsInput, ProfileUncheckedUpdateWithoutGroupConversationsInput>
    create: XOR<ProfileCreateWithoutGroupConversationsInput, ProfileUncheckedCreateWithoutGroupConversationsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutGroupConversationsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutGroupConversationsInput, ProfileUncheckedUpdateWithoutGroupConversationsInput>
  }

  export type ProfileUpdateWithoutGroupConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUpdateManyWithoutProfileNestedInput
    members?: MemberUpdateManyWithoutProfileNestedInput
    channels?: ChannelUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUpdateManyWithoutTargetProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutGroupConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUncheckedUpdateManyWithoutProfileNestedInput
    members?: MemberUncheckedUpdateManyWithoutProfileNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUncheckedUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUncheckedUpdateManyWithoutRequesterProfileNestedInput
    friendRequestsReceived?: FriendRequestUncheckedUpdateManyWithoutTargetProfileNestedInput
  }

  export type MemberUpsertWithoutGroupConversationsInput = {
    update: XOR<MemberUpdateWithoutGroupConversationsInput, MemberUncheckedUpdateWithoutGroupConversationsInput>
    create: XOR<MemberCreateWithoutGroupConversationsInput, MemberUncheckedCreateWithoutGroupConversationsInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutGroupConversationsInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutGroupConversationsInput, MemberUncheckedUpdateWithoutGroupConversationsInput>
  }

  export type MemberUpdateWithoutGroupConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutMembersNestedInput
    server?: ServerUpdateOneRequiredWithoutMembersNestedInput
    conversationsInitiated?: ConversationUpdateManyWithoutMemberOneNestedInput
    conversationsReceived?: ConversationUpdateManyWithoutMemberTwoNestedInput
    groupMessages?: GroupMessageUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutGroupConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationsInitiated?: ConversationUncheckedUpdateManyWithoutMemberOneNestedInput
    conversationsReceived?: ConversationUncheckedUpdateManyWithoutMemberTwoNestedInput
    groupMessages?: GroupMessageUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type GroupConversationUpsertWithoutMembersInput = {
    update: XOR<GroupConversationUpdateWithoutMembersInput, GroupConversationUncheckedUpdateWithoutMembersInput>
    create: XOR<GroupConversationCreateWithoutMembersInput, GroupConversationUncheckedCreateWithoutMembersInput>
    where?: GroupConversationWhereInput
  }

  export type GroupConversationUpdateToOneWithWhereWithoutMembersInput = {
    where?: GroupConversationWhereInput
    data: XOR<GroupConversationUpdateWithoutMembersInput, GroupConversationUncheckedUpdateWithoutMembersInput>
  }

  export type GroupConversationUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutGroupConversationsCreatedNestedInput
    messages?: GroupMessageUpdateManyWithoutGroupConversationNestedInput
  }

  export type GroupConversationUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: GroupMessageUncheckedUpdateManyWithoutGroupConversationNestedInput
  }

  export type MemberCreateWithoutGroupMessagesInput = {
    id?: string
    role?: $Enums.MemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutMembersInput
    server: ServerCreateNestedOneWithoutMembersInput
    conversationsInitiated?: ConversationCreateNestedManyWithoutMemberOneInput
    conversationsReceived?: ConversationCreateNestedManyWithoutMemberTwoInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutGroupMessagesInput = {
    id?: string
    role?: $Enums.MemberRole
    profileId: string
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversationsInitiated?: ConversationUncheckedCreateNestedManyWithoutMemberOneInput
    conversationsReceived?: ConversationUncheckedCreateNestedManyWithoutMemberTwoInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutGroupMessagesInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutGroupMessagesInput, MemberUncheckedCreateWithoutGroupMessagesInput>
  }

  export type GroupConversationCreateWithoutMessagesInput = {
    id?: string
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutGroupConversationsCreatedInput
    members?: GroupConversationMemberCreateNestedManyWithoutGroupConversationInput
  }

  export type GroupConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    imageUrl?: string | null
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: GroupConversationMemberUncheckedCreateNestedManyWithoutGroupConversationInput
  }

  export type GroupConversationCreateOrConnectWithoutMessagesInput = {
    where: GroupConversationWhereUniqueInput
    create: XOR<GroupConversationCreateWithoutMessagesInput, GroupConversationUncheckedCreateWithoutMessagesInput>
  }

  export type MemberUpsertWithoutGroupMessagesInput = {
    update: XOR<MemberUpdateWithoutGroupMessagesInput, MemberUncheckedUpdateWithoutGroupMessagesInput>
    create: XOR<MemberCreateWithoutGroupMessagesInput, MemberUncheckedCreateWithoutGroupMessagesInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutGroupMessagesInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutGroupMessagesInput, MemberUncheckedUpdateWithoutGroupMessagesInput>
  }

  export type MemberUpdateWithoutGroupMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutMembersNestedInput
    server?: ServerUpdateOneRequiredWithoutMembersNestedInput
    conversationsInitiated?: ConversationUpdateManyWithoutMemberOneNestedInput
    conversationsReceived?: ConversationUpdateManyWithoutMemberTwoNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutGroupMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationsInitiated?: ConversationUncheckedUpdateManyWithoutMemberOneNestedInput
    conversationsReceived?: ConversationUncheckedUpdateManyWithoutMemberTwoNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type GroupConversationUpsertWithoutMessagesInput = {
    update: XOR<GroupConversationUpdateWithoutMessagesInput, GroupConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<GroupConversationCreateWithoutMessagesInput, GroupConversationUncheckedCreateWithoutMessagesInput>
    where?: GroupConversationWhereInput
  }

  export type GroupConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: GroupConversationWhereInput
    data: XOR<GroupConversationUpdateWithoutMessagesInput, GroupConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type GroupConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutGroupConversationsCreatedNestedInput
    members?: GroupConversationMemberUpdateManyWithoutGroupConversationNestedInput
  }

  export type GroupConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupConversationMemberUncheckedUpdateManyWithoutGroupConversationNestedInput
  }

  export type ProfileCreateWithoutFriendRequestsSentInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerCreateNestedManyWithoutProfileInput
    members?: MemberCreateNestedManyWithoutProfileInput
    channels?: ChannelCreateNestedManyWithoutProfileInput
    conversations?: ConversationCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationCreateNestedManyWithoutProfileInput
    friendRequestsReceived?: FriendRequestCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileUncheckedCreateWithoutFriendRequestsSentInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerUncheckedCreateNestedManyWithoutProfileInput
    members?: MemberUncheckedCreateNestedManyWithoutProfileInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProfileInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationUncheckedCreateNestedManyWithoutProfileInput
    friendRequestsReceived?: FriendRequestUncheckedCreateNestedManyWithoutTargetProfileInput
  }

  export type ProfileCreateOrConnectWithoutFriendRequestsSentInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutFriendRequestsSentInput, ProfileUncheckedCreateWithoutFriendRequestsSentInput>
  }

  export type ProfileCreateWithoutFriendRequestsReceivedInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerCreateNestedManyWithoutProfileInput
    members?: MemberCreateNestedManyWithoutProfileInput
    channels?: ChannelCreateNestedManyWithoutProfileInput
    conversations?: ConversationCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestCreateNestedManyWithoutRequesterProfileInput
  }

  export type ProfileUncheckedCreateWithoutFriendRequestsReceivedInput = {
    id?: string
    userId: string
    name: string
    imageUrl: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    servers?: ServerUncheckedCreateNestedManyWithoutProfileInput
    members?: MemberUncheckedCreateNestedManyWithoutProfileInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProfileInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutProfileInput
    groupConversations?: GroupConversationMemberUncheckedCreateNestedManyWithoutProfileInput
    groupConversationsCreated?: GroupConversationUncheckedCreateNestedManyWithoutProfileInput
    friendRequestsSent?: FriendRequestUncheckedCreateNestedManyWithoutRequesterProfileInput
  }

  export type ProfileCreateOrConnectWithoutFriendRequestsReceivedInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutFriendRequestsReceivedInput, ProfileUncheckedCreateWithoutFriendRequestsReceivedInput>
  }

  export type ProfileUpsertWithoutFriendRequestsSentInput = {
    update: XOR<ProfileUpdateWithoutFriendRequestsSentInput, ProfileUncheckedUpdateWithoutFriendRequestsSentInput>
    create: XOR<ProfileCreateWithoutFriendRequestsSentInput, ProfileUncheckedCreateWithoutFriendRequestsSentInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutFriendRequestsSentInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutFriendRequestsSentInput, ProfileUncheckedUpdateWithoutFriendRequestsSentInput>
  }

  export type ProfileUpdateWithoutFriendRequestsSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUpdateManyWithoutProfileNestedInput
    members?: MemberUpdateManyWithoutProfileNestedInput
    channels?: ChannelUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUpdateManyWithoutProfileNestedInput
    friendRequestsReceived?: FriendRequestUpdateManyWithoutTargetProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutFriendRequestsSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUncheckedUpdateManyWithoutProfileNestedInput
    members?: MemberUncheckedUpdateManyWithoutProfileNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUncheckedUpdateManyWithoutProfileNestedInput
    friendRequestsReceived?: FriendRequestUncheckedUpdateManyWithoutTargetProfileNestedInput
  }

  export type ProfileUpsertWithoutFriendRequestsReceivedInput = {
    update: XOR<ProfileUpdateWithoutFriendRequestsReceivedInput, ProfileUncheckedUpdateWithoutFriendRequestsReceivedInput>
    create: XOR<ProfileCreateWithoutFriendRequestsReceivedInput, ProfileUncheckedCreateWithoutFriendRequestsReceivedInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutFriendRequestsReceivedInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutFriendRequestsReceivedInput, ProfileUncheckedUpdateWithoutFriendRequestsReceivedInput>
  }

  export type ProfileUpdateWithoutFriendRequestsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUpdateManyWithoutProfileNestedInput
    members?: MemberUpdateManyWithoutProfileNestedInput
    channels?: ChannelUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUpdateManyWithoutRequesterProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutFriendRequestsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servers?: ServerUncheckedUpdateManyWithoutProfileNestedInput
    members?: MemberUncheckedUpdateManyWithoutProfileNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProfileNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutProfileNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutProfileNestedInput
    groupConversationsCreated?: GroupConversationUncheckedUpdateManyWithoutProfileNestedInput
    friendRequestsSent?: FriendRequestUncheckedUpdateManyWithoutRequesterProfileNestedInput
  }

  export type ServerCreateManyProfileInput = {
    id?: string
    name: string
    imageUrl: string
    inviteCode: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberCreateManyProfileInput = {
    id?: string
    role?: $Enums.MemberRole
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChannelCreateManyProfileInput = {
    id?: string
    name: string
    type?: $Enums.ChannelType
    serverId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationCreateManyProfileInput = {
    id?: string
    memberOneId: string
    memberTwoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupConversationMemberCreateManyProfileInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    memberId: string
    groupConversationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupConversationCreateManyProfileInput = {
    id?: string
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendRequestCreateManyRequesterProfileInput = {
    id?: string
    targetProfileId: string
    status?: $Enums.FriendRequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendRequestCreateManyTargetProfileInput = {
    id?: string
    requesterProfileId: string
    status?: $Enums.FriendRequestStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServerUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUpdateManyWithoutServerNestedInput
    channels?: ChannelUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUncheckedUpdateManyWithoutServerNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutServerNestedInput
  }

  export type ServerUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    server?: ServerUpdateOneRequiredWithoutMembersNestedInput
    conversationsInitiated?: ConversationUpdateManyWithoutMemberOneNestedInput
    conversationsReceived?: ConversationUpdateManyWithoutMemberTwoNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutMemberNestedInput
    groupMessages?: GroupMessageUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationsInitiated?: ConversationUncheckedUpdateManyWithoutMemberOneNestedInput
    conversationsReceived?: ConversationUncheckedUpdateManyWithoutMemberTwoNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutMemberNestedInput
    groupMessages?: GroupMessageUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    server?: ServerUpdateOneRequiredWithoutChannelsNestedInput
  }

  export type ChannelUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    serverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberOne?: MemberUpdateOneRequiredWithoutConversationsInitiatedNestedInput
    memberTwo?: MemberUpdateOneRequiredWithoutConversationsReceivedNestedInput
  }

  export type ConversationUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberOneId?: StringFieldUpdateOperationsInput | string
    memberTwoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberOneId?: StringFieldUpdateOperationsInput | string
    memberTwoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationMemberUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutGroupConversationsNestedInput
    groupConversation?: GroupConversationUpdateOneRequiredWithoutMembersNestedInput
  }

  export type GroupConversationMemberUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    memberId?: StringFieldUpdateOperationsInput | string
    groupConversationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationMemberUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    memberId?: StringFieldUpdateOperationsInput | string
    groupConversationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupConversationMemberUpdateManyWithoutGroupConversationNestedInput
    messages?: GroupMessageUpdateManyWithoutGroupConversationNestedInput
  }

  export type GroupConversationUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: GroupConversationMemberUncheckedUpdateManyWithoutGroupConversationNestedInput
    messages?: GroupMessageUncheckedUpdateManyWithoutGroupConversationNestedInput
  }

  export type GroupConversationUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUpdateWithoutRequesterProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendRequestStatusFieldUpdateOperationsInput | $Enums.FriendRequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetProfile?: ProfileUpdateOneRequiredWithoutFriendRequestsReceivedNestedInput
  }

  export type FriendRequestUncheckedUpdateWithoutRequesterProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetProfileId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendRequestStatusFieldUpdateOperationsInput | $Enums.FriendRequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyWithoutRequesterProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetProfileId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendRequestStatusFieldUpdateOperationsInput | $Enums.FriendRequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUpdateWithoutTargetProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendRequestStatusFieldUpdateOperationsInput | $Enums.FriendRequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requesterProfile?: ProfileUpdateOneRequiredWithoutFriendRequestsSentNestedInput
  }

  export type FriendRequestUncheckedUpdateWithoutTargetProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterProfileId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendRequestStatusFieldUpdateOperationsInput | $Enums.FriendRequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendRequestUncheckedUpdateManyWithoutTargetProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterProfileId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendRequestStatusFieldUpdateOperationsInput | $Enums.FriendRequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCreateManyServerInput = {
    id?: string
    role?: $Enums.MemberRole
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChannelCreateManyServerInput = {
    id?: string
    name: string
    type?: $Enums.ChannelType
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutMembersNestedInput
    conversationsInitiated?: ConversationUpdateManyWithoutMemberOneNestedInput
    conversationsReceived?: ConversationUpdateManyWithoutMemberTwoNestedInput
    groupConversations?: GroupConversationMemberUpdateManyWithoutMemberNestedInput
    groupMessages?: GroupMessageUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversationsInitiated?: ConversationUncheckedUpdateManyWithoutMemberOneNestedInput
    conversationsReceived?: ConversationUncheckedUpdateManyWithoutMemberTwoNestedInput
    groupConversations?: GroupConversationMemberUncheckedUpdateManyWithoutMemberNestedInput
    groupMessages?: GroupMessageUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateManyWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutChannelsNestedInput
  }

  export type ChannelUncheckedUpdateWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelUncheckedUpdateManyWithoutServerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumChannelTypeFieldUpdateOperationsInput | $Enums.ChannelType
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateManyMemberOneInput = {
    id?: string
    memberTwoId: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationCreateManyMemberTwoInput = {
    id?: string
    memberOneId: string
    profileId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupConversationMemberCreateManyMemberInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    profileId: string
    groupConversationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMessageCreateManyMemberInput = {
    id?: string
    content: string
    fileUrl?: string | null
    deleted?: boolean
    groupConversationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateWithoutMemberOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberTwo?: MemberUpdateOneRequiredWithoutConversationsReceivedNestedInput
    profile?: ProfileUpdateOneRequiredWithoutConversationsNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMemberOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberTwoId?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyWithoutMemberOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberTwoId?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUpdateWithoutMemberTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberOne?: MemberUpdateOneRequiredWithoutConversationsInitiatedNestedInput
    profile?: ProfileUpdateOneRequiredWithoutConversationsNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMemberTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberOneId?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyWithoutMemberTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberOneId?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationMemberUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutGroupConversationsNestedInput
    groupConversation?: GroupConversationUpdateOneRequiredWithoutMembersNestedInput
  }

  export type GroupConversationMemberUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    groupConversationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationMemberUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    groupConversationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMessageUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupConversation?: GroupConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type GroupMessageUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    groupConversationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMessageUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    groupConversationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationMemberCreateManyGroupConversationInput = {
    id?: string
    role?: $Enums.GroupMemberRole
    profileId: string
    memberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupMessageCreateManyGroupConversationInput = {
    id?: string
    content: string
    fileUrl?: string | null
    deleted?: boolean
    memberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupConversationMemberUpdateWithoutGroupConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutGroupConversationsNestedInput
    member?: MemberUpdateOneRequiredWithoutGroupConversationsNestedInput
  }

  export type GroupConversationMemberUncheckedUpdateWithoutGroupConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConversationMemberUncheckedUpdateManyWithoutGroupConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupMemberRoleFieldUpdateOperationsInput | $Enums.GroupMemberRole
    profileId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMessageUpdateWithoutGroupConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutGroupMessagesNestedInput
  }

  export type GroupMessageUncheckedUpdateWithoutGroupConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupMessageUncheckedUpdateManyWithoutGroupConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deleted?: BoolFieldUpdateOperationsInput | boolean
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}