# Configuración de Monedas basada en JSON

## Descripción

El proyecto ha sido migrado para cargar la configuración de monedas desde un archivo JSON en lugar de constantes hardcodeadas. Esto permite una mayor flexibilidad para agregar, modificar o eliminar monedas sin necesidad de cambiar el código fuente.

## Estructura del Archivo de Configuración

### Ubicación
```
src/data/currencies.json
```

### Estructura JSON

```json
{
  "realCurrencies": {
    "USD": {
      "code": "USD",
      "name": "US Dollar",
      "symbol": "$",
      "isBase": true
    },
    "COP": {
      "code": "COP", 
      "name": "Colombian Peso",
      "symbol": "$",
      "isBase": false
    },
    "MXN": {
      "code": "MXN",
      "name": "Mexican Peso", 
      "symbol": "$",
      "isBase": false
    }
  },
  "fictionalCurrencies": {
    "gansito": {
      "code": "gansito",
      "name": "Gansito",
      "namePlural": "Gansitos",
      "icon": "🪿",
      "usdValue": 1,
      "order": 3
    },
    "balatro": {
      "code": "balatro",
      "name": "Balatro",
      "namePlural": "Balatros", 
      "icon": "🤡",
      "usdValue": 10,
      "order": 2
    },
    "silksong": {
      "code": "silksong",
      "name": "Silksong",
      "namePlural": "Silksongs",
      "icon": "🕷️", 
      "usdValue": 20,
      "order": 1
    }
  },
  "conversionRules": {
    "gansito": {
      "baseUnit": true,
      "equivalences": []
    },
    "balatro": {
      "baseUnit": false,
      "equivalences": [
        {
          "unit": "gansito",
          "rate": 10
        }
      ]
    },
    "silksong": {
      "baseUnit": false,
      "equivalences": [
        {
          "unit": "balatro",
          "rate": 2
        },
        {
          "unit": "gansito", 
          "rate": 20
        }
      ]
    }
  },
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2025-09-20T00:00:00Z",
    "description": "Configuración de monedas reales y ficticias para el conversor"
  }
}
```

## Nuevos Hooks de React

### `useCurrencyConfig()`
Hook principal que carga la configuración completa desde el archivo JSON.

```typescript
const { config, isLoading, error } = useCurrencyConfig();
```

### `useRealCurrencies()`
Hook especializado para trabajar con monedas reales.

```typescript
const { 
  currencies, 
  isLoading, 
  error, 
  getRealCurrency,
  getAllRealCurrencies,
  getBaseCurrency 
} = useRealCurrencies();
```

### `useFictionalCurrencies()`
Hook especializado para trabajar con monedas ficticias.

```typescript
const {
  currencies,
  isLoading,
  error,
  getFictionalCurrency,
  getAllFictionalCurrencies,
  getFictionalCurrencyByValue
} = useFictionalCurrencies();
```

### `useConversionRules()`
Hook para trabajar con las reglas de conversión entre monedas.

```typescript
const {
  rules,
  isLoading,
  error,
  getConversionRule,
  getBaseUnit,
  getEquivalenceRate
} = useConversionRules();
```

## Nuevas Funciones de Utilidad

### Funciones basadas en configuración

- `convertUSDToFictionalCurrencyWithConfig()`: Convierte USD a monedas ficticias usando configuración
- `convertRealToFictionalCurrencyWithConfig()`: Convierte monedas reales a ficticias usando configuración  
- `formatFictionalCurrencyWithConfig()`: Formatea monedas ficticias usando configuración

### Funciones legacy (mantenidas para compatibilidad)

- `convertUSDToFictionalCurrency()` 
- `convertRealToFictionalCurrency()`
- `formatFictionalCurrency()`

## Compatibilidad hacia atrás

El código mantiene compatibilidad total hacia atrás. Si la configuración JSON falla en cargar, automáticamente utiliza las constantes legacy hardcodeadas.

## Componentes Actualizados

### `CurrencySelector`
- Ahora carga las opciones de monedas desde la configuración JSON
- Fallback automático a constantes legacy si falla la carga

### `ConversionResult` 
- Utiliza la configuración para formatear y mostrar resultados
- Íconos y nombres dinámicos basados en la configuración

### `ExchangeRatesDisplay`
- Construye la lista de monedas dinámicamente desde la configuración
- Soporte para monedas ficticias y reales configurables

### `useCurrencyConverter`
- Utiliza funciones de conversión basadas en configuración
- Fallback automático a funciones legacy

## Ventajas de la Nueva Estructura

1. **Flexibilidad**: Agregar nuevas monedas sin modificar código
2. **Mantenibilidad**: Configuración centralizada en un solo archivo
3. **Escalabilidad**: Fácil expansión para soportar más monedas
4. **Internacionalización**: Nombres y símbolos configurables
5. **Retrocompatibilidad**: Funciona con código existente
6. **Tipado fuerte**: TypeScript mantiene la seguridad de tipos

## Cómo Agregar una Nueva Moneda

### Moneda Real
```json
"EUR": {
  "code": "EUR",
  "name": "Euro", 
  "symbol": "€",
  "isBase": false
}
```

### Moneda Ficticia
```json
"nueva_moneda": {
  "code": "nueva_moneda",
  "name": "Nueva Moneda",
  "namePlural": "Nuevas Monedas",
  "icon": "🎯",
  "usdValue": 5,
  "order": 4
}
```

### Regla de Conversión
```json
"nueva_moneda": {
  "baseUnit": false,
  "equivalences": [
    {
      "unit": "gansito",
      "rate": 5
    }
  ]
}
```

## Testing

La aplicación mantiene toda la funcionalidad original:
- Conversión de monedas reales a ficticias
- Visualización de tasas de cambio
- Formateo correcto de resultados
- Carga dinámica de configuración
- Manejo de errores y estados de carga
