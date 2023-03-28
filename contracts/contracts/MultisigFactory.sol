// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract MultisigFactory {
    using EnumerableSet for EnumerableSet.AddressSet;

    address public owner;
    address public implementation;
    mapping(address => EnumerableSet.AddressSet) private deployments;

    event ImplementationUpdated(address _caller, address _implementation);
    event ContractDeployed(address _deployer, address _deployedContract, address _implementation);

    constructor(address _implementation) {
        owner = msg.sender;
        implementation = _implementation;
    }

    function setImplementation(address _implementation) public {
        require(msg.sender == owner, "Not owner!");
        implementation = _implementation;
        emit ImplementationUpdated(msg.sender, _implementation);
    }

    function deployContract(bytes memory _data) public {
        address deployedContract = Clones.clone(implementation);
        (bool success, ) = deployedContract.call(_data);
        require(success, "Failed to initialize contract!");
        bool added = deployments[msg.sender].add(deployedContract);
        require(added, "Failed to add to registry!");
        emit ContractDeployed(msg.sender, deployedContract, implementation);
    }

    function getDeployed(address _deployer) public view returns(address[] memory) {
        return deployments[_deployer].values();
    }

    function countDeployed(address _deployer) public view returns(uint256) {
        return deployments[_deployer].length();
    }
}