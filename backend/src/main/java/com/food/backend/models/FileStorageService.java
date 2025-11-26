package com.food.backend.models;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.food.backend.config.FileStorageConfig;
import com.food.backend.exception.FileStorageException;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(FileStorageConfig fileStorageConfig) {
        this.fileStorageLocation = Paths.get(fileStorageConfig.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create upload directory", ex);
        }
    }

    /**
     * Sauvegarde une image et retourne le nom du fichier
     */
    public String storeFile(MultipartFile file, String subfolder) {
        // Vérifier que le fichier n'est pas vide
        if (file.isEmpty()) {
            throw new FileStorageException("Cannot store empty file");
        }

        // Vérifier le type de fichier
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new FileStorageException("Only image files are allowed");
        }

        // Nettoyer le nom du fichier
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        
        // Générer un nom unique
        String fileExtension = "";
        if (originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String newFilename = UUID.randomUUID().toString() + fileExtension;

        try {
            // Créer le sous-dossier si nécessaire
            Path targetLocation = this.fileStorageLocation.resolve(subfolder);
            Files.createDirectories(targetLocation);

            // Copier le fichier
            Path destinationFile = targetLocation.resolve(newFilename);
            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

            // Retourner le chemin relatif
            return subfolder + "/" + newFilename;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + newFilename, ex);
        }
    }

    /**
     * Charge une image comme Resource
     */
    public Resource loadFileAsResource(String filename) {
        try {
            Path filePath = this.fileStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists()) {
                return resource;
            } else {
                throw new FileStorageException("File not found " + filename);
            }
        } catch (MalformedURLException ex) {
            throw new FileStorageException("File not found " + filename, ex);
        }
    }

    /**
     * Supprime un fichier
     */
    public void deleteFile(String filename) {
        try {
            Path filePath = this.fileStorageLocation.resolve(filename).normalize();
            Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            throw new FileStorageException("Could not delete file " + filename, ex);
        }
    }
}