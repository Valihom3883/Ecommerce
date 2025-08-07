CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(63) UNIQUE NOT NULL,
    tier VARCHAR(20) NOT NULL CHECK (tier IN ('basic', 'pro', 'enterprise')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tenant_configs (
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    theme JSONB DEFAULT '{"primary_color": "#3b82f6"}',
    payment_gateways VARCHAR(50)[] DEFAULT ARRAY['stripe'],
    max_products INT NOT NULL DEFAULT 100,
    max_staff INT NOT NULL DEFAULT 3
);

-- Row-level security for all tenant-specific tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON products
    USING (tenant_id = current_setting('app.current_tenant')::UUID);
