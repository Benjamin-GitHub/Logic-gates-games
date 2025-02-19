import andGate from "./and.svg";
import notGate from "./not.svg";
import nandGate from "./nand.svg";
import orGate from "./or.svg";
import norGate from "./nor.svg";

const gateIcons = {
  AND: { src: andGate, inputs: 2, outputs: 1 },
  NOT: { src: notGate, inputs: 1, outputs: 1 },
  OR: { src: orGate, inputs: 2, outputs: 1 },
  NAND: { src: nandGate, inputs: 2, outputs: 1 },
  NOR: { src: norGate, inputs: 2, outputs: 1 },
};

export default gateIcons;

