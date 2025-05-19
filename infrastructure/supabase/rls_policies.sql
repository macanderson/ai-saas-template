-- Enable RLS
ALTER TABLE "tenants" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "candidates" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "searches" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "jobs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "companies" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "users can view their tenant" ON "tenants";
DROP POLICY IF EXISTS "Access own users profile" ON "users";
DROP POLICY IF EXISTS "Access companies in same tenant" ON "companies";
DROP POLICY IF EXISTS "Access candidates in same tenant" ON "candidates";
DROP POLICY IF EXISTS "Access jobs in same tenant" ON "jobs";
DROP POLICY IF EXISTS "Access searches in same tenant" ON "searches";

-- Create policies with proper checks for both tenant_id and role

-- 1. tenants Table
CREATE POLICY "users can view their tenant"
ON "tenants"
FOR SELECT
USING (
  auth.jwt() ->> 'tenant_id' = id::text 
  AND auth.jwt() ->> 'role' = 'business'
);

-- 2. users Table
CREATE POLICY "Access own users profile"
ON "users"
FOR ALL
USING (
  auth.jwt() ->> 'tenant_id' = tenantId::text
  AND auth.jwt() ->> 'role' IN ('business', 'admin')
);

-- 3. companies Table
CREATE POLICY "Access companies in same tenant"
ON "companies"
FOR ALL
USING (
  auth.jwt() ->> 'tenant_id' = tenantId::text
  AND auth.jwt() ->> 'role' IN ('business', 'admin')
);

-- 4. candidates Table
CREATE POLICY "Access candidates in same tenant"
ON "candidates"
FOR ALL
USING (
  auth.jwt() ->> 'tenant_id' = tenantId::text
  AND auth.jwt() ->> 'role' IN ('business', 'admin')
);

-- 5. jobs Table
CREATE POLICY "Access jobs in same tenant"
ON "jobs"
FOR ALL
USING (
  auth.jwt() ->> 'tenant_id' = tenantId::text
  AND auth.jwt() ->> 'role' IN ('business', 'admin')
);

-- 6. searches Table
CREATE POLICY "Access searches in same tenant"
ON "searches"
FOR ALL
USING (
  auth.jwt() ->> 'tenant_id' = tenantId::text
  AND auth.jwt() ->> 'role' IN ('business', 'admin')
);
