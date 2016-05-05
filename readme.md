#Nodepop API#

##1.- Introducción##
En este documento se describe la funcionalidad de la API nodepop. Esta API tiene la utilidad de gestionar usuarios y anuncios de una base de datos


##2.- Gestión de usuarios
Dentro de la gestión de usuarios hay dos operaciones a realizar:

1. Autenticación
2. Registro de un nuevo usuario

###2.- Autenticación

<table>
<tr>
	<th> Método </th>
	<th> Ruta </th>
	<th> Parámetros en Body </th>
	<th> Respuesta </th>
</tr>
<tr>
	<td> POST </td>
	<td> /api/v1/usuarios/authenticate </td>
	<td> 
		<li> usuario </li>
		<li> email </li>
		<li> password </li>
	</td>
	<td>
	{
  "sucess": true,<br>
  "token": "xxxx"}
	</td>
</tr>
</table>
