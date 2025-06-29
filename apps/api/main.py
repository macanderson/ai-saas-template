from fastapi import FastAPI, HTTPException
from prisma import Prisma
from pydantic import BaseModel

app = FastAPI()
prisma = Prisma()

class TenantIn(BaseModel):
    name: str

class Tenant(TenantIn):
    id: str

class UserIn(BaseModel):
    email: str
    name: str | None = None
    tenantId: str

class User(UserIn):
    id: str

@app.on_event("startup")
async def startup():
    await prisma.connect()

@app.on_event("shutdown")
async def shutdown():
    await prisma.disconnect()

@app.get("/tenants", response_model=list[Tenant])
async def list_tenants():
    return await prisma.tenant.find_many()

@app.post("/tenants", response_model=Tenant)
async def create_tenant(data: TenantIn):
    return await prisma.tenant.create({"data": {"name": data.name}})

@app.post("/users", response_model=User)
async def create_user(data: UserIn):
    return await prisma.user.create(
        {"data": {"email": data.email, "name": data.name, "tenantId": data.tenantId}}
    )

@app.delete("/tenants/{tenant_id}")
async def delete_tenant(tenant_id: str):
    record = await prisma.tenant.delete({"where": {"id": tenant_id}})
    if not record:
        raise HTTPException(status_code=404, detail="Not found")
    return record
