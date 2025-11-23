import os
import mysql.connector
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database configuration from environment variables
DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'port': int(os.getenv('DB_PORT', '3306')),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD')
}

def insert_data(transformed_sql_values):
    """
    Insert data into AWS database using the transformed SQL values
    
    Args:
        transformed_sql_values: List of SQL value tuples like "('2024-01-15', val2, val3, 'appendValue')"
    """
    try:
        # Connect to the database
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        # Adjust this INSERT statement to match your table structure
        # Example: INSERT INTO your_table (date_col, col2, col3, name_col) VALUES
        table_name = os.getenv('TABLE_NAME', 'Stock')
        
        for values in transformed_sql_values:
            query = f"INSERT INTO {table_name} (date_col, col2, col3, name_col) VALUES {values}"
            cursor.execute(query)
        
        # Commit the transaction
        conn.commit()
        print(f"Successfully inserted {len(transformed_sql_values)} rows")
        
    except Exception as e:
        print(f"Error inserting data: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

def main():
    # Read transformed data from file or paste here
    # Example usage:
    transformed_data = [
        # Paste your transformed SQL values here
        # Example: "('2024-01-15', 123, 456, 'John')",
    ]
    
    # Or read from a file
    with open('transformed_output.txt', 'r') as f:
        transformed_data = [line.strip().rstrip(',') for line in f if line.strip()]
    
    insert_data(transformed_data)

if __name__ == "__main__":
    main()
