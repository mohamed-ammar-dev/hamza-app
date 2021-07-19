declare module "mongoose" {
  interface Query<
    ResultType,
    DocType extends Document<any, {}>,
    THelpers = {}
  > {
    cache();
  }

  interface Aggregate<R> {
    cache();
  }
}
