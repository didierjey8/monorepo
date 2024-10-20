import React, { useState, useRef } from "react";
import { Box, Button, Icon, IconButton, Stack, Typography, alpha } from "@mui/material";

import { pdfjs, Document, Page } from "react-pdf";


import { browserVersion, browserName } from 'react-device-detect';

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

import { useEffect } from "react";
import { memo } from "react";

let PDFViewer;

if((browserName.indexOf("Safari")>=0&&Number(browserVersion)<15.4)||(browserName.indexOf("Chro")>=0&&Number(browserVersion)<92)){
  PDFViewer = memo(function PDFViewer({
    file = null,
    url = "",
    collapsed = false,
    iframe = false,
    hideHeader = false,
    name = "",
    width = "100%",
    height = "auto",
    borderRadius = 0.5,
    onLoad = () => {},
    actions = [],
    children,
  }) {
    const containerRef = useRef();
    const pdfRef = useRef();
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [pdf, setPdf] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);

      setTimeout(() => {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setSize({ width, height });
        onLoad({ containerRef: pdfRef.current, numPages, size: { width, height } });
      }, 500);
    };

    const handleChangePage = (action) => {
      setCurrentPage((prev) => (action === "next" ? prev + 1 : prev - 1));
    };

    useEffect(() => {
      setPdf(file || { url });
    }, [url, file]);

    if (!file && !url) return <></>;

    return (
      <Box
        position="relative"
        flexShrink={0}
        borderRadius={borderRadius}
        overflow="hidden"
        bgcolor={(t) => t.palette.grey[300]}
        width={width}
        padding={0}
        boxShadow={collapsed ? 1 : 0}
        sx={{
          "&:hover .pdf-pagination": {
            transform: "translateY(0)",
          },
        }}
      >
        {!hideHeader && (
          <Stack
            direction="row"
            justifyContent={actions.length ? "space-between" : "center"}
            alignItems="center"
            spacing={1}
            padding={2}
            bgcolor={(t) => t.palette.primary.main}
          >
            <Typography
              fontSize={18}
              fontWeight={600}
              color="white"
              sx={{
                wordBreak: "break-all",
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              {name || file?.name}
            </Typography>
            {actions.length > 0 && (
              <Stack direction="row" display="flex" justifyContent="flex-end" spacing={1}>
                {actions.map((action) => action)}
              </Stack>
            )}
          </Stack>
        )}
        <Box
          ref={pdfRef}
          position="relative"
          width="100%"
          height={height}
          padding={0}
          overflow="hidden"
          sx={{
            aspectRatio: 918 / 1188,
            overflowY: "auto",
            "& .pdf-viewer-document": {
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              "& .pdf-viewer-page": {
                width: "100%",
                "& canvas": {
                  width: "100% !important",
                  height: "auto !important",
                },
              },
            },
          }}
        >
          {children && (
            <Box position="absolute" zIndex={1} left={32} top={32} width={size.width} height={size.height}>
              {children}
            </Box>
          )}
          <Box display="flex" width="100%" height="100%" padding={0}>
            <iframe src={url} width="100%" height="100%" style={{ border: 0 }} />
          </Box>
        </Box>
        {!collapsed && (
          <Box
            className="pdf-pagination"
            position="absolute"
            zIndex={1}
            bottom={0}
            left={0}
            right={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            padding={1}
            bgcolor={(t) => alpha(t.palette.primary.main, 0.8)}
            sx={(t) => ({
              transform: "translateY(100%)",
              transition: t.transitions.create(["transform"]),
            })}
          >
            <IconButton disabled={currentPage === 0} color="secondary" onClick={() => handleChangePage("prev")}>
              <Icon className="fa-chevron-left" />
            </IconButton>
            <Typography fontWeight={600} color="white">
              Página {currentPage + 1}/{numPages}
            </Typography>
            <IconButton
              disabled={currentPage === numPages - 1}
              color="secondary"
              onClick={() => handleChangePage("next")}
            >
              <Icon className="fa-chevron-right" />
            </IconButton>
          </Box>
        )}
      </Box>
    );
  });
}else{
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  PDFViewer = memo(function PDFViewer({
    file = null,
    url = "",
    collapsed = false,
    iframe = false,
    hideHeader = false,
    name = "",
    width = "100%",
    height = "auto",
    borderRadius = 0.5,
    onLoad = () => {},
    actions = [],
    children,
  }) {
    const containerRef = useRef();
    const pdfRef = useRef();
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [pdf, setPdf] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);

      setTimeout(() => {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setSize({ width, height });
        onLoad({ containerRef: pdfRef.current, numPages, size: { width, height } });
      }, 500);
    };

    const handleChangePage = (action) => {
      setCurrentPage((prev) => (action === "next" ? prev + 1 : prev - 1));
    };

    useEffect(() => {
      setPdf(file || { url });
    }, [url, file]);

    if (!file && !url) return <></>;

    return (
      <Box
        position="relative"
        flexShrink={0}
        borderRadius={borderRadius}
        overflow="hidden"
        bgcolor={(t) => t.palette.grey[300]}
        width={width}
        boxShadow={collapsed ? 1 : 0}
        sx={{
          "&:hover .pdf-pagination": {
            transform: "translateY(0)",
          },
        }}
      >
        {!hideHeader && (
          <Stack
            direction="row"
            justifyContent={actions.length ? "space-between" : "center"}
            alignItems="center"
            spacing={1}
            padding={2}
            bgcolor={(t) => t.palette.primary.main}
          >
            <Typography
              fontSize={18}
              fontWeight={600}
              color="white"
              sx={{
                wordBreak: "break-all",
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              {name || file?.name}
            </Typography>
            {actions.length > 0 && (
              <Stack direction="row" display="flex" justifyContent="flex-end" spacing={1}>
                {actions.map((action) => action)}
              </Stack>
            )}
          </Stack>
        )}
        <Box
          ref={pdfRef}
          position="relative"
          width="100%"
          height={height}
          padding={0}
          overflow="hidden"
          sx={{
            aspectRatio: 918 / 1188,
            overflowY: "auto",
            "& .pdf-viewer-document": {
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              "& .pdf-viewer-page": {
                width: "100%",
                "& canvas": {
                  width: "100% !important",
                  height: "auto !important",
                },
              },
            },
          }}
        >
          {children && (
            <Box position="absolute" zIndex={1} left={32} top={32} width={size.width} height={size.height}>
              {children}
            </Box>
          )}
          {iframe ? (
            <Box display="flex" width="100%" height="100%" padding={0}>
              <Document
              inputRef={containerRef}
              className="pdf-viewer-document"
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {collapsed ? (
                Array.from(Array(numPages).keys()).map((index) => (
                  <Page
                    className="pdf-viewer-page"
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                ))
              ) : (
                <Page
                  className="pdf-viewer-page"
                  key={`page_${currentPage + 1}`}
                  pageNumber={currentPage + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              )}
            </Document>
            </Box>
          ) : (
            <Document
              inputRef={containerRef}
              className="pdf-viewer-document"
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {collapsed ? (
                Array.from(Array(numPages).keys()).map((index) => (
                  <Page
                    className="pdf-viewer-page"
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                ))
              ) : (
                <Page
                  className="pdf-viewer-page"
                  key={`page_${currentPage + 1}`}
                  pageNumber={currentPage + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              )}
            </Document>
          )}
        </Box>
        {!collapsed && (
          <Box
            className="pdf-pagination"
            position="absolute"
            zIndex={1}
            bottom={0}
            left={0}
            right={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            padding={1}
            bgcolor={(t) => alpha(t.palette.primary.main, 0.8)}
            sx={(t) => ({
              transform: "translateY(100%)",
              transition: t.transitions.create(["transform"]),
            })}
          >
            <IconButton disabled={currentPage === 0} color="secondary" onClick={() => handleChangePage("prev")}>
              <Icon className="fa-chevron-left" />
            </IconButton>
            <Typography fontWeight={600} color="white">
              Página {currentPage + 1}/{numPages}
            </Typography>
            <IconButton
              disabled={currentPage === numPages - 1}
              color="secondary"
              onClick={() => handleChangePage("next")}
            >
              <Icon className="fa-chevron-right" />
            </IconButton>
          </Box>
        )}
      </Box>
    );
  });
}



export default PDFViewer;
