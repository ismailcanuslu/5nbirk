package com.blog._nbirk.services;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Service
public class FTPService {

    @Value("${ftp.server}")
    private String ftpServer;

    @Value("${ftp.port}")
    private int ftpPort;

    @Value("${ftp.username}")
    private String ftpUsername;

    @Value("${ftp.password}")
    private String ftpPassword;

    @Value("${ftp.upload-dir}")
    private String remoteDir;

    public void uploadFile(File file) throws IOException {
        FTPClient ftpClient = new FTPClient();

        try {
            ftpClient.connect(ftpServer, ftpPort);
            boolean login = ftpClient.login(ftpUsername, ftpPassword);

            if (!login) {
                throw new IOException("FTP login failed.");
            }

            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            String remoteFilePath = remoteDir + "/" + file.getName();
            try (FileInputStream inputStream = new FileInputStream(file)) {
                boolean uploaded = ftpClient.storeFile(remoteFilePath, inputStream);
                if (!uploaded) {
                    throw new IOException("File upload failed.");
                }
                System.out.println("File uploaded successfully to " + remoteFilePath);
            }
        } finally {
            ftpClient.logout();
            ftpClient.disconnect();
        }
    }
}
