import { kspdAppConfig } from '../products/kspd-app/config.js'
import { smartFridgeConfig } from '../products/smart-fridge-app/config.js'
import { smartColdStorageConfig } from '../products/smart-cold-storage-app/config.js'
import { officeSuiteConfig } from '../products/office-suite/config.js'
import { cmsSystemConfig } from '../products/cms-system/config.js'

export const productData = {
  'APP软件': [
    kspdAppConfig,
    smartFridgeConfig,
    smartColdStorageConfig
  ],
  'PC软件': [
    officeSuiteConfig
  ],
  'WEB软件': [
    cmsSystemConfig
  ]
}