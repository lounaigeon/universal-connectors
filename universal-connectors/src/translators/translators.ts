//import Converter from './specconverters/openapi3_to_swagger2.js'
import path from "path";
import fs from "fs";
import Converter from "./specconverters/openapi3_to_swagger2.js";
import { ConnectorState } from "../renderer/src/slices/connectorSlice";

export function powerPlatformTranslator(
  universalConnector: ConnectorState,
  directory: string
) {
  const data = {
    spec: universalConnector.api,
    source: path.join(directory, "openapi.json"),
  };
  const converter = new Converter(data);
  const swagger = converter.convert();
  // Remove chars that break paconn
  const problemChars = ["’", "”", "“"];
  const regex = new RegExp(problemChars.map((c) => `\\${c}`).join("|"), "g");
  const regexXX = new RegExp("XX", "g");


  const cleanSwagger = JSON.stringify(swagger).replace(regex, "'").replace(regexXX, "00");


  const connectionProperties = {
    properties: {
      connectionParameters: {
        token: {
          type: "oauthSetting",
          oAuthSettings: {
            identityProvider: "oauth2",
            clientId: "TU7nBEYCGjAdsgou6tgBTVS4j8Gleszb",
            scopes: [],
            redirectMode: "Global",
            redirectUrl: "https://global.consent.azure-apim.net/redirect",
            properties: {
              IsFirstParty: "False",
              IsOnbehalfofLoginSupported: false
            },
            customParameters: {
              authorizationUrl: {
                value: "https://int.api.service.nhs.uk/oauth2-mock/authorize"
              },
              tokenUrl: {
                value: "https://int.api.service.nhs.uk/oauth2-mock/token"
              },
              refreshUrl: {
                value: "https://int.api.service.nhs.uk/oauth2-mock/token"
              }
            }
          }
        }
      },
      iconBrandColor: "#007ee5",
      capabilities: [],
      publisher: "Lou Naigeon"
    }
  };



  const targetDirectory = path.join(directory, "microsoft-power-platform");
  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
  }

  fs.writeFileSync(
    path.join(targetDirectory, "apiDefinition.swagger.json"),
    cleanSwagger
  );

  console.log(JSON.stringify(connectionProperties));
  fs.writeFileSync(
    path.join(targetDirectory, "apiProperties.json"),
    JSON.stringify(connectionProperties)
  );

}
