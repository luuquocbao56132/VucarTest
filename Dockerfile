FROM python:3.12-slim

# Set environment variables
ENV PYTHONUNBUFFERED 1
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port and run application
EXPOSE 5000
CMD ["python", "run.py"]
