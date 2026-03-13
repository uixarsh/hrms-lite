import asyncpg
import os
import asyncio
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

pool = None


async def init_db():
    global pool

    retries = 10

    for i in range(retries):
        try:
            pool = await asyncpg.create_pool(
                DATABASE_URL,
                min_size=5,
                max_size=20
            )

            print("Connected to Postgres")
            return

        except Exception as e:
            print(f"Postgres not ready... retrying ({i+1}/{retries})")
            await asyncio.sleep(2)

    raise Exception("Could not connect to Postgres")


async def close_db():
    await pool.close()


async def get_connection():
    async with pool.acquire() as conn:
        yield conn