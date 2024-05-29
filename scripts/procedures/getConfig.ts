import { types as T, compat } from "../deps.ts";


export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "electrum-tor-address": {
    "name": "Electrum Tor Address",
    "description": "The Tor address for the electrum interface.",
    "type": "pointer",
    "subtype": "package",
    "package-id": "fulcrum",
    "target": "tor-address",
    "interface": "electrum"
  },
  "bitcoind": {
    "type": "union",
    "name": "Bitcoin Core",
    "description": "The Bitcoin Core node to connect to",
    "tag": {
      "id": "type",
      "name": "Type",
      "variant-names": {
        "internal": "Bitcoin Core",
        "internal-proxy": "Bitcoin Proxy",
      },
      "description": "Options<ul><li>Bitcoin Core: the Bitcoin Core node installed on your Embassy</li><li>Bitcoin Proxy: the Bitcoin Proxy service installed on your Embassy</li></ul>",
    },
    "default": "internal",
    "variants": {
      "internal": {
        "user": {
          "type": "pointer",
          "name": "RPC Username",
          "description": "The username for Bitcoin Core's RPC interface",
          "subtype": "package",
          "package-id": "bitcoind",
          "target": "config",
          "multi": false,
          "selector": "$.rpc.username"
        },
        "password": {
          "type": "pointer",
          "name": "RPC Password",
          "description": "The password for Bitcoin Core's RPC interface",
          "subtype": "package",
          "package-id": "bitcoind",
          "target": "config",
          "multi": false,
          "selector": "$.rpc.password"
        }
      },
      "internal-proxy": {
        "user": {
          "type": "pointer",
          "name": "RPC Username",
          "description": "The username for the RPC user allocated to fulcrum",
          "subtype": "package",
          "package-id": "btc-rpc-proxy",
          "target": "config",
          "multi": false,
          "selector": "$.users[?(@.name == \"fulcrum\")].name"
        },
        "password": {
          "type": "pointer",
          "name": "RPC Password",
          "description": "The password for the RPC user allocated to fulcrum",
          "subtype": "package",
          "package-id": "btc-rpc-proxy",
          "target": "config",
          "multi": false,
          "selector": "$.users[?(@.name == \"fulcrum\")].password"
        }
      }
    }
  },
  "advanced": {
    "type": "object",
    "name": "Advanced",
    "description": "Advanced settings for Fulcrum",
    "spec": {
      // "log-filters": {
      //   "type": "enum",
      //   "name": "Log Filters",
      //   "values": [
      //     "ERROR",
      //     "WARN",
      //     "INFO",
      //     "DEBUG",
      //     "TRACE"
      //   ],
      //   "value-names": {
      //     "ERROR": "Error",
      //     "WARN": "Warning",
      //     "INFO": "Info",
      //     "DEBUG": "Debug",
      //     "TRACE": "Trace"
      //   },
      //   "default": "INFO"
      // },
      "bitcoind-timeout": {
        "type": "number",
        "name": "Bitcoin RPC Timeout",
        "description": "https://github.com/cculianu/Fulcrum/blob/feb8f6a8dd361422f8388e77978a55e38ddb5ca0/doc/fulcrum-example-config.conf#L596-L608",
        "nullable": true,
        "range": "[1,*)",
        "integral": true,
        "units": "seconds",
        "default": 600,
      },
      "bitcoind-clients": {
        "type": "number",
        "name": "Bitcoin RPC Clients",
        "description": "https://github.com/cculianu/Fulcrum/blob/feb8f6a8dd361422f8388e77978a55e38ddb5ca0/doc/fulcrum-example-config.conf#L536-L555",
        "nullable": true,
        "range": "[1,*)",
        "integral": true,
        "units": "clients",
        "default": 1,
      },
      "worker-threads": {
        "type": "number",
        "name": "Worker Threads",
        "description": "https://github.com/cculianu/Fulcrum/blob/feb8f6a8dd361422f8388e77978a55e38ddb5ca0/doc/fulcrum-example-config.conf#L959-L982",
        "nullable": true,
        "range": "[1,*)",
        "integral": true,
        "units": "threads",
        "default": 1,
      },
      "db-mem": {
        "type": "number",
        "name": "Database Memory Size",
        "description": "https://github.com/cculianu/Fulcrum/blob/feb8f6a8dd361422f8388e77978a55e38ddb5ca0/doc/fulcrum-example-config.conf#L650-L663",
        "nullable": true,
        "range": "[1,*)",
        "integral": true,
        "units": "MB",
        "default": 1024,
      },
      "db-max-open-files": {
        "type": "number",
        "name": "Database Maximum Open Files",
        "description": "https://github.com/cculianu/Fulcrum/blob/feb8f6a8dd361422f8388e77978a55e38ddb5ca0/doc/fulcrum-example-config.conf#L630-L647",
        "nullable": true,
        "range": "[1,*)",
        "integral": true,
        "units": "files",
        "default": 200,
      },
      "fast-sync": {
        "type": "number",
        "name": "Fast Sync MB",
        "description": "https://github.com/cculianu/Fulcrum/blob/feb8f6a8dd361422f8388e77978a55e38ddb5ca0/doc/fulcrum-example-config.conf#L685-L701",
        "nullable": true,
        "range": "[1,*)",
        "integral": true,
        "units": "MB",
        "default": 1024,
      },
    }
  }
})
