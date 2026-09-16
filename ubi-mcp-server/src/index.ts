import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

function createServer() {
  const server = new McpServer({
    name: "ubi-analytics-server",
    version: "1.0.0",
  });

  server.tool(
    "get_top_search_keywords",
    "Returns the most frequently searched product keywords on the ShopEase site",
    { size: z.number().optional().describe("How many top keywords to return (default 5)") },
    async ({ size }) => {
      const response = await fetch(`http://localhost:8080/api/analytics/top-queries?size=${size ?? 5}`);
      const data = await response.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.tool(
    "get_top_clicked_products",
    "Returns the most clicked products on the ShopEase site",
    { size: z.number().optional().describe("How many top products to return (default 5)") },
    async ({ size }) => {
      const response = await fetch(`http://localhost:8080/api/analytics/top-clicked-products?size=${size ?? 5}`);
      const data = await response.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.tool(
    "get_top_filtered_categories",
    "Returns the most popular product categories, based on how often users filter by category",
    { size: z.number().optional().describe("How many top categories to return (default 5)") },
    async ({ size }) => {
      const response = await fetch(`http://localhost:8080/api/analytics/top-filtered-categories?size=${size ?? 5}`);
      const data = await response.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.tool(
    "get_event_summary",
    "Returns overall counts of user activity: total searches, views, clicks, and category filters applied",
    {},
    async () => {
      const response = await fetch("http://localhost:8080/api/analytics/summary");
      const data = await response.json();
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
  );

  return server;
}

const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on("close", () => {
    transport.close();
    server.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.error(`UBI MCP server running on http://localhost:${PORT}/mcp`);
});