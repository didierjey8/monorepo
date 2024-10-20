import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Container,
  Icon,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";

import { $Contract } from "../services";
import Wrapper from "../components/Wrapper";
import PDFViewer from "../components/PDFViewer";
import Loader from "../components/Loader";
import PDF from "../utils/PDF";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import ActivitiesModal from "../components/Activities/ActivitiesModal";

function DetailContract() {
  const navigate = useNavigate();
  const [{ lang }] = useAuth();
  const { id } = useParams();
  const [contract, setContract] = useState({});
  const [pdfView, setPdfView] = useState("no-signatures");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const fetchContract = async () => {
    setLoading(true);

    const { status, data } = await $Contract.get({ id });

    if (status) {
      setContract(data);

      if (data.document) {
        setPdfView("signatures");
      }

      setLoading(false);
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    (async () => {
      await fetchContract();
    })();
  }, [id]);

  if (loading) {
    return <Loader pulse />;
  }

  return (
    <>
      <Wrapper>
        <Container maxWidth="xxl">
          <Stack alignItems="center">

            <Stack width={{ xs: "100%", md: "60%" }} spacing={2}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 1 }} justifyContent="space-between">
                <ButtonGroup variant="contained" sx={{ boxShadow: 1 }}>
                  <Button
                    variant={pdfView === "no-signatures" ? "contained" : "outlined"}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                    onClick={() => setPdfView("no-signatures")}
                  >
                    {lang?.no_signatures_title_doc_detail || ""}
                  </Button>
                  <Button
                    disabled={!contract.document}
                    variant={pdfView === "signatures" ? "contained" : "outlined"}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                    onClick={() => setPdfView("signatures")}
                  >
                    {lang?.with_signatures_title_doc_detail || ""}
                  </Button>
                </ButtonGroup>
                <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                  <Button onClick={() => { setModal("activities") }} >
                    {lang?.Activities_MonitorearContratos}
                  </Button>
                </Stack>
              </Stack>

              <PDFViewer
                collapsed
                iframe={true}
                url={`${pdfView === "no-signatures"
                  ? PDF.formatURL(contract.doc_fileblocks)
                  : pdfView === "signatures"
                    ? PDF.formatURL(contract.document)
                    : PDF.formatURL(contract.anexo_fileblocks)
                  }#zoom=100`}
                name={contract?.document_clean || "Contrato"}
                actions={[
                  <Tooltip arrow key={1} title="Abrir">
                    <IconButton
                      target="_blank"
                      color="secondary"
                      component={Link}
                      to={
                        pdfView === "no-signatures"
                          ? contract.doc_fileblocks
                          : pdfView === "signatures"
                            ? contract.document
                            : contract.anexo_fileblocks
                      }
                    >
                      <Icon className="fa-expand" />
                    </IconButton>
                  </Tooltip>,
                  <Tooltip arrow key={1} title="Descargar">
                    <IconButton
                      color="secondary"
                      component={Link}
                      to={
                        pdfView === "no-signatures"
                          ? PDF.formatURL(contract.doc_fileblocks)
                          : pdfView === "signatures"
                            ? PDF.formatURL(contract.document)
                            : PDF.formatURL(contract.anexo_fileblocks)
                      }
                    >
                      <Icon className="fa-download" />
                    </IconButton>
                  </Tooltip>,
                ]}
              />
            </Stack>
          </Stack>
        </Container>
      </Wrapper>

      <ActivitiesModal soli_id={id} open={modal === "activities"} onClose={() => setModal(null)} />
    </>
  );
}

export default DetailContract;
