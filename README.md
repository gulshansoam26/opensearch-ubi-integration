# ShopEase – OpenSearch UBI Integration

A simple React + Spring Boot application that captures user behavior such as page views, searches, and product clicks and integrates these events with OpenSearch User Behavior Insights (UBI).

## Approach

The application follows this flow:

React Frontend → Spring Boot Backend → OpenSearch 3.0.0 + UBI Plugin → `ubi_events`

- React captures `view`, `search`, and `click` events.
- Events are sent to Spring Boot using Axios.
- Spring Boot processes the events and forwards them to the UBI `ubi_events` index over HTTPS.
- An additional `/insights` page displays aggregated view, search, and click counts from the collected events.

![Architecture Diagram](architecture.png)

## How to Run

### 1. Start OpenSearch

```cmd
cd /d "C:\path\to\opensearch-3.0.0-windows-x64\opensearch-3.0.0"
opensearch-windows-install.bat
```

Initialize UBI during the first setup:

```powershell
curl.exe -k -u "admin:<password>" -X POST "https://localhost:9200/_plugins/ubi/initialize"
```

### 2. Start Backend

Set:

```text
OPENSEARCH_PASSWORD=<your-password>
OPENSEARCH_TRUSTSTORE_PASSWORD=<your-truststore-password>
```

Then:

```cmd
cd ubi-backend
mvnw.cmd spring-boot:run
```

Backend: `http://localhost:8080`

### 3. Start Frontend

```cmd
cd shopease
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Open the website and perform searches, views, and product clicks.

Analytics dashboard: `http://localhost:5173/insights`

## Assumptions

- OpenSearch 3.0.0 and the UBI plugin are installed locally.
- OpenSearch runs on `https://localhost:9200`.
- A PKCS12 truststore containing the OpenSearch CA certificate is configured for the backend.
- OpenSearch credentials are provided through environment variables and are not committed to GitHub.
- Docker, Kafka, and application-level authentication are outside the scope of this assignment.

## References

- [OpenSearch User Behavior Insights](https://github.com/opensearch-project/user-behavior-insights)
- [UBI Project](https://github.com/o19s/ubi)
- [UBI Event Schema](https://o19s.github.io/ubi/schema/latest/event.schema.json)
