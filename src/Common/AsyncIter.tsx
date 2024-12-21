import { from, toArray } from "ix/asynciterable";
import { map } from "ix/asynciterable/operators";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AsyncIter {
    public static toArray = toArray;
    public static from = from;
    public static map = map;
}
