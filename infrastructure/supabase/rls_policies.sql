-- Enable RLS
ALTER TABLE "tenants" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "candidates" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "searches" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "jobs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "companies" ENABLE ROW LEVEL SECURITY;


-- users can only access their own tenant data

-- 1. tenants Table
CREATE POLICY "users can view their tenant"
ON "tenants"
FOR SELECT
USING ( 
  auth.jwt() ->> 'tenant_id' = id
);

-- 2. users Table
CREATE POLICY "Access own users profile"
ON "users"
FOR ALL
USING (
  auth.jwt() ->> 'tenant_id' = tenantId
);

-- 3. companies Table
CREATE POLICY "Access companies in same tenant"
ON "companies"
FOR ALL
USING (
  auth.jwt() ->> 'tenant_id' = tenantId
);

-- 4. candidates Table
CREATE POLICY "Access candidates in same tenant"
ON "candidates"
FOR ALL
USING (
  auth.jwt() ->> 'tenant_id' = tenantId
);

-- 5. jobs Table
CREATE POLICY "Access jobs in same tenant"
ON "jobs"
FOR ALL
USING (
  auth.jwt() ->> 'tenant_id' = tenantId
);

-- 6. searches Table
CREATE POLICY "Access searches in same tenant"
ON "searches"
FOR ALL
USING (
  auth.jwt() ->> 'tenant_id' = tenantId
);