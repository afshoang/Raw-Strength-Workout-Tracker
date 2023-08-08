// import { store, persistor } from '../store';
import workOutSlice, { initialState } from "../slices/workOutSlice";

describe("tests for workOutSlice", () => {
    test("initialize slice with initialValue", () => {
        const workOutInit = workOutSlice(initialState, { type: "unknown" });
        // console.log("store", persistor.getState());
        expect(workOutInit).toBe(initialState);
    });

    // test("delete work outs", () => {
    //     const workOutInit = workOutSlice(initialState, { type: "unknown" });
    //     expect(workOutInit).toBe(initialState);
    // })
});