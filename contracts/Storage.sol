// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {

  mapping(uint => uint) public aa;
  mapping(address => uint) public bb; 

  uint[] public cc; 

  uint8 public a = 7; 
  uint16 public b = 10; 
  address public c = 0x96A09C03c69aB2cB063f2d94Ec98341E6a0C36C6; 
  bool d = true; 
  uint64 public e = 15; 

  uint256 public f = 200; 
  uint8 public g = 40; 
  uint8 public g1 = 40; 
  uint8 public g2 = 40; 
  uint256 public h = 789; 

  constructor() {
    cc.push(1);
    cc.push(10);
    cc.push(100);

    aa[2] = 4;
    aa[3] = 10;

    bb[0x96A09C03c69aB2cB063f2d94Ec98341E6a0C36C6] = 100;
  }
}