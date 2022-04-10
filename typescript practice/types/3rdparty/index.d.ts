import _ from "lodash";

declare module "lodash" {
    interface LoDashStatic {
        multiply(multipler: number, multiplicand: number): number;
    }
}