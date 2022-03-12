// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Test {
  function test(uint testNum) external pure returns(uint) {
    assembly {
      let _num := 4 // asa cream var in asembly, cream o var si ii adaugam num 4
      let _fmp := mload(0x40) // mload pt a incarca ceva din memorie din pozitia 0x40 
    } // folosim asta pt a putea scrie low lvl instructions in assembly in contractul sol // de obicei nu tre folosit // il folosim pt a vedea cum este alocata memoria

    uint8[3] memory items = [1,2,3]; // stocam 3 num de 8byts in memorie

    return testNum;
  }
}