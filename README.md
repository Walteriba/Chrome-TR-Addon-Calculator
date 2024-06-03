# Extensión de Chrome: TR | Adicionales

Esta extensión de Chrome de **uso personal** permite extraer y agregar datos a una tabla desde una plataforma de cobros. Clasifica los datos según el tipo de operación y los muestra en una tabla resumen en el popup de la extensión.

**Nota:** Por motivos de seguridad, no se detalla la web utilizada ya que se manejan datos sensibles.

## Funcionalidades

- Extrae datos de una tabla HTML en una página web.
- Clasifica los datos según el tipo de operación.
- Muestra los datos agregados en una tabla en el popup de la extensión.
- Aplica lógica adicional para recalcular ciertos valores.

## Instrucciones de Instalación

1. Ve a `chrome://extensions/` en tu navegador Chrome.

2. Activa el "Modo de desarrollador" en la esquina superior derecha de la página.

3. Haz clic en "Cargar extensión descomprimida" y selecciona la carpeta de la extensión.

## Archivos

- `manifest.json`: Contiene la configuración básica y permisos de la extensión.
- `content.js`: Contiene el script que se ejecuta en la página para extraer y agregar datos según la lógica del negocio.
- `popup.html`: Contiene la estructura HTML del popup de la extensión.
- `popup.js`: Contiene el script para manejar la lógica y eventos del popup.

## Uso

1. Navega a una página web que contenga la tabla de datos específica.

2. Haz clic en el icono de la extensión en la barra de herramientas de Chrome para abrir el popup.

3. Haz clic en el botón "Extraer Datos" para ejecutar el script de extracción y agregación.

4. Los datos agregados se mostrarán en una tabla en el popup.

## Ejemplo de Tabla Resumen

| Descripción  | Cantidad | Total  |
|--------------|----------|--------|
| Virtual      | 2        | 32,500.00 |
| Sube         | 1        | 1,000.00 |
| Facturas     | 2        | 35,000.00 |
| Recaudación  | -        | 5,985.00  |
| Cobros       | 3        | 38,485.00 |
| Retiros      | 1        | 1,000.00  |
| Caja         | -        | 36,560.75 |
| Adicional    | -        | 4,450.00  |