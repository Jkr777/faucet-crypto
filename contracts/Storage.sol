// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {

  // keccak256(key . slot)
  mapping(uint => uint) public aa; // cream un mapping care are key uint si val tot uint // a map will take a hole memory slot // stored in slot 0
  mapping(address => uint) public bb; // stored in slot 1

  // keccak256(slot) + index of the item pt a primi val din idx
  uint[] public cc; // cream un dynamic arr // o sa primeasca un singur slot in storage // stored in slot 2

  // we will write the maximum of bytes each datatype can have
  uint8 public a = 7; // 1byte
  uint16 public b = 10; // 2bytes
  address public c = 0x96A09C03c69aB2cB063f2d94Ec98341E6a0C36C6; // 20bytes
  bool d = true; // 1byte
  uint64 public e = 15; // 8bytes
  // total 32bytes, all values will be stored in slot 3

  uint256 public f = 200; // 32bytes // stored in slot 4
  uint8 public g = 40; // 1byte // stored in slot 5
  uint8 public g1 = 40; // 1byte // stored in slot 5
  uint8 public g2 = 40; // 1byte // stored in slot 5
  uint256 public h = 789; // 32bytes // stored in slot 6 // you can see that ordering your data matters, slot 2 is not full

  constructor() {
    cc.push(1); // ca si in js, folosim push pt a impinge o val in arr
    cc.push(10);
    cc.push(100);

    aa[2] = 4;
    aa[3] = 10;

    bb[0x96A09C03c69aB2cB063f2d94Ec98341E6a0C36C6] = 100;
  } // a constructor is called as you deploy your contract, in the deploynd phase
}