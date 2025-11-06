// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title APIRegistry
 * @dev Smart contract for registering and managing API listings on Polygon
 */
contract APIRegistry {
    struct APIListing {
        string id;
        string name;
        string description;
        address provider;
        string endpoint;
        string category;
        string pricingType;
        string priceAmount;
        bool isActive;
        uint256 createdAt;
        uint256 updatedAt;
        uint256 totalCalls;
        uint256 totalRevenue;
    }

    struct Provider {
        address providerAddress;
        string name;
        string description;
        uint256 totalRevenue;
        uint256 reputation;
        uint256 joinedAt;
        bool isActive;
    }

    // Mappings
    mapping(string => APIListing) public apis;
    mapping(address => Provider) public providers;
    mapping(address => string[]) public providerAPIs;
    mapping(string => bool) public apiExists;
    
    string[] public allAPIIds;
    address[] public allProviders;

    // Events
    event APIRegistered(
        string indexed apiId,
        address indexed provider,
        string name,
        string endpoint
    );
    
    event APIUpdated(
        string indexed apiId,
        address indexed provider
    );
    
    event APIDeactivated(
        string indexed apiId,
        address indexed provider
    );
    
    event ProviderRegistered(
        address indexed provider,
        string name
    );
    
    event PaymentRecorded(
        string indexed apiId,
        address indexed consumer,
        uint256 amount
    );

    // Modifiers
    modifier onlyProvider(string memory apiId) {
        require(apis[apiId].provider == msg.sender, "Not the API provider");
        _;
    }

    modifier apiMustExist(string memory apiId) {
        require(apiExists[apiId], "API does not exist");
        _;
    }

    /**
     * @dev Register a new provider
     */
    function registerProvider(
        string memory name,
        string memory description
    ) external {
        require(!providers[msg.sender].isActive, "Provider already registered");
        
        providers[msg.sender] = Provider({
            providerAddress: msg.sender,
            name: name,
            description: description,
            totalRevenue: 0,
            reputation: 100,
            joinedAt: block.timestamp,
            isActive: true
        });
        
        allProviders.push(msg.sender);
        
        emit ProviderRegistered(msg.sender, name);
    }

    /**
     * @dev Register a new API
     */
    function registerAPI(
        string memory id,
        string memory name,
        string memory description,
        string memory endpoint,
        string memory category,
        string memory pricingType,
        string memory priceAmount
    ) external {
        require(providers[msg.sender].isActive, "Provider not registered");
        require(!apiExists[id], "API ID already exists");
        
        apis[id] = APIListing({
            id: id,
            name: name,
            description: description,
            provider: msg.sender,
            endpoint: endpoint,
            category: category,
            pricingType: pricingType,
            priceAmount: priceAmount,
            isActive: true,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            totalCalls: 0,
            totalRevenue: 0
        });
        
        apiExists[id] = true;
        allAPIIds.push(id);
        providerAPIs[msg.sender].push(id);
        
        emit APIRegistered(id, msg.sender, name, endpoint);
    }

    /**
     * @dev Update an existing API
     */
    function updateAPI(
        string memory id,
        string memory name,
        string memory description,
        string memory endpoint,
        string memory priceAmount
    ) external onlyProvider(id) apiMustExist(id) {
        APIListing storage api = apis[id];
        api.name = name;
        api.description = description;
        api.endpoint = endpoint;
        api.priceAmount = priceAmount;
        api.updatedAt = block.timestamp;
        
        emit APIUpdated(id, msg.sender);
    }

    /**
     * @dev Deactivate an API
     */
    function deactivateAPI(string memory id) 
        external 
        onlyProvider(id) 
        apiMustExist(id) 
    {
        apis[id].isActive = false;
        apis[id].updatedAt = block.timestamp;
        
        emit APIDeactivated(id, msg.sender);
    }

    /**
     * @dev Record a payment for an API call
     */
    function recordPayment(
        string memory apiId,
        address consumer,
        uint256 amount
    ) external apiMustExist(apiId) {
        // In production, this should be called by a trusted oracle or payment processor
        apis[apiId].totalCalls += 1;
        apis[apiId].totalRevenue += amount;
        providers[apis[apiId].provider].totalRevenue += amount;
        
        emit PaymentRecorded(apiId, consumer, amount);
    }

    /**
     * @dev Get all API IDs
     */
    function getAllAPIIds() external view returns (string[] memory) {
        return allAPIIds;
    }

    /**
     * @dev Get APIs by provider
     */
    function getProviderAPIs(address provider) 
        external 
        view 
        returns (string[] memory) 
    {
        return providerAPIs[provider];
    }

    /**
     * @dev Get API details
     */
    function getAPI(string memory id) 
        external 
        view 
        apiMustExist(id)
        returns (APIListing memory) 
    {
        return apis[id];
    }

    /**
     * @dev Get provider details
     */
    function getProvider(address provider) 
        external 
        view 
        returns (Provider memory) 
    {
        return providers[provider];
    }

    /**
     * @dev Get total number of APIs
     */
    function getTotalAPIs() external view returns (uint256) {
        return allAPIIds.length;
    }

    /**
     * @dev Get total number of providers
     */
    function getTotalProviders() external view returns (uint256) {
        return allProviders.length;
    }
}

