export type GraphQLQueryType = {
  readonly query: string;
  readonly variables: Record<string, unknown>;
};
