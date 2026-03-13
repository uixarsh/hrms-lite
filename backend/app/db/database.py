import asyncpg
import os
import asyncio
import ssl
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

pool = None


async def init_db():
    global pool

    retries = 10

    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

    for i in range(retries):
        try:
            pool = await asyncpg.create_pool(
                dsn=DATABASE_URL,
                ssl=ssl_context,
                min_size=1,
                max_size=10
            )

            print("Connected to Postgres")

            async with pool.acquire() as conn:

                await conn.execute("""
                CREATE TABLE IF NOT EXISTS employees (
                    id UUID PRIMARY KEY,
                    employee_id TEXT UNIQUE,
                    full_name TEXT NOT NULL,
                    email TEXT UNIQUE,
                    department TEXT
                )
                """)

                await conn.execute("""
                CREATE TABLE IF NOT EXISTS attendance (
                    id UUID PRIMARY KEY,
                    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
                    date DATE NOT NULL,
                    status TEXT NOT NULL,
                    UNIQUE(employee_id, date)
                )
                """)

            print("Tables ensured")
            return

        except Exception as e:
            print(f"Postgres not ready... retrying ({i+1}/{retries})")
            print("Error:", e)
            await asyncio.sleep(2)

    raise Exception("Could not connect to Postgres")


async def close_db():
    global pool
    if pool:
        await pool.close()


async def get_connection():
    async with pool.acquire() as conn:
        yield conn