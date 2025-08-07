-- File: backend/core/schema.sql
CREATE TABLE tenants (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tier VARCHAR(50) CHECK (tier IN ('basic','pro','enterprise'))
);

CREATE TABLE products (
    id UUID PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id),
    sku VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) CHECK (price > 0),
    inventory_count INT DEFAULT 0
);

CREATE TABLE orders (
    id UUID PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id),
    total DECIMAL(12,2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending','paid','shipped'))
);
