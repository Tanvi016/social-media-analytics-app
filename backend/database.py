import psycopg2
from psycopg2 import pool
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
import os
from dotenv import load_dotenv

load_dotenv()


class Database:
    _connection_pool = None

    @classmethod
    def initialize(cls):
        if cls._connection_pool is None:
            try:
                cls._connection_pool = psycopg2.pool.ThreadedConnectionPool(
                    minconn=int(os.getenv("DB_POOL_MIN", "2")),
                    maxconn=int(os.getenv("DB_POOL_MAX", "10")),
                    dbname=os.getenv("DB_NAME", "social-analytics"),
                    user=os.getenv("DB_USER", "postgres"),
                    password=os.getenv("DB_PASSWORD", "password"),
                    host=os.getenv("DB_HOST", "localhost"),
                    port=os.getenv("DB_PORT", "5432")
                )
                print("✅ Database connection pool created successfully")
            except Exception as e:
                print(f"❌ Error creating connection pool: {e}")
                raise

    @classmethod
    def get_connection(cls):
        if cls._connection_pool is None:
            cls.initialize()
        return cls._connection_pool.getconn()

    @classmethod
    def return_connection(cls, connection):
        if cls._connection_pool:
            cls._connection_pool.putconn(connection)

    @classmethod
    def close_all_connections(cls):
        if cls._connection_pool:
            cls._connection_pool.closeall()
            cls._connection_pool = None
            print("👋 All database connections closed")


@contextmanager
def get_db_connection():
    connection = Database.get_connection()
    try:
        yield connection
        connection.commit()
    except Exception as e:
        connection.rollback()
        print(f"Database error: {e}")
        raise
    finally:
        Database.return_connection(connection)


def get_db_cursor(connection):
    return connection.cursor(cursor_factory=RealDictCursor)
