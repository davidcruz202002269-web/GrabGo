import express from "express";
import { readFile, writeFile } from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbAuth = path.join(__dirname, '../src/db/usuariosRegistrados.json');

export async function readDB() {
    const data = await readFile(dbAuth, 'utf-8');
    return JSON.parse(data);
}

export async function writeDB(data) {
    await writeFile(dbAuth, JSON.stringify(data, null, 2), 'utf-8');
}