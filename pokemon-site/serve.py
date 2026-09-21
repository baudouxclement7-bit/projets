#!/usr/bin/env python3
"""
Simple HTTP server to serve the Pokémon site locally
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

def serve_site(directory=".", port=8000):
    """Serve the website from the specified directory on the given port"""
    # Change to the directory containing the site
    os.chdir(directory)
    
    # Set up the server
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print(f"🚀 Serveur démarré sur http://localhost:{port}")
            print(f"📁 Servant les fichiers depuis : {os.getcwd()}")
            print("💡 Appuyez sur Ctrl+C pour arrêter le serveur")
            print("-" * 50)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Serveur arrêté.")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Erreur : Le port {port} est déjà utilisé.")
            print("💡 Essayez un autre port ou arrêtez le processus utilisant ce port.")
            print(f"💡 Exemple : python3 serve.py 8080")
        else:
            print(f"❌ Erreur lors du démarrage du serveur : {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Allow port to be specified as command line argument
    port = 8000  # default
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"❌ Erreur : '{sys.argv[1]}' n'est pas un numéro de port valide")
            print("💡 Utilisation : python3 serve.py [port]")
            sys.exit(1)
    
    serve_site(port=port)