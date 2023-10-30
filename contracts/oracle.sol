pragma solidity =0.8.18;

contract oracle {
    function latestAnswer() public pure returns (uint256) {
        return 17000000000;
               
    }

    function getAssetPrice(address _asset) public pure returns (uint256) {
        return 17000000000;
    }
}