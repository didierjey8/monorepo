import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Icon,
  Pagination,
  Stack,
  Skeleton,
  Typography,
} from "@mui/material";
import Wrapper from "../components/Wrapper";
import CardContract from "../components/CardContract";
import { CONTRACT_STATUS } from "../utils/Constants";
import { $Contract } from "../services";
import Flex from "../utils/Flex";
import { useSearchParams } from "react-router-dom";
import { useMounted } from "../hooks";
import { useAuth } from "../hooks";
import TranslationsES from "../translations/translationsDashboard/es.json";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const accordionAction = searchParams.get("tab");
  const mounted = useMounted();
  const [accordion, setAccordion] = useState("");
  const [contracts, setContracts] = useState({ closed: [], open: [] });
  const [pagination, setPagination] = useState({
    closed: { page: 1, start: 0, limit: 10, total: 0 },
    open: { page: 1, start: 0, limit: 10, total: 0 },
  });
  const [loading, setLoading] = useState(false);
  const [{ lang }, { setLang }] = useAuth();
  
  const handleChangePagination = (state, value) => {
    setPagination((prev) => ({
      ...prev,
      [state]: { ...prev[state], page: value, start: (value - 1) * prev[state].limit },
    }));
  };

  const handleChangeAccordion = (expanded, action) => {
    setAccordion(expanded ? action : null);
    if (expanded) {
      searchParams.set("tab", action);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("tab");
      setSearchParams(searchParams);
    }
  };

  const fetchContracts = async () => {
    const { status, data } = await $Contract.get({
      like: "",
      filter: { filter: 0, tags: [], status: [] },
      tags: ``,
      order: 0,
      params: JSON.stringify([
        {
          start: pagination[accordion]?.start || 0,
          limit: pagination[accordion]?.limit || 10,
          status: ``,
          order: 0,
          tags: ``,
        },
      ]),
    });

    if (status) {
      setContracts({
        closed: data.datos.closed || [],
        open: data.datos.document || [],
      });
      setPagination((prev) => ({
        ...prev,
        closed: { ...prev.closed, total: data.total?.closed || 0 },
        open: { ...prev.open, total: data.total?.document || 0 },
      }));
    }
  };

  useEffect(() => {
    if (mounted) {
      (async () => {
        setLoading(true);
        await fetchContracts();

        setLoading(false);
      })();
    }
  }, [pagination.closed.start, pagination.open.start, lang]);

  useEffect(() => {
    if (mounted) {
      setAccordion(accordionAction);
    } else {
      setAccordion(accordionAction || "closed");
    }
  }, [accordionAction]);

  useEffect(() => {
    setLang(TranslationsES);
  }, []);

  return (
    <Wrapper>
      <Stack spacing={2} alignItems="flex-start">
        <Typography fontSize={24} fontWeight={600}>
          {lang?.documentoprocesofirma_label || ""}
          <Typography style={{ fontSize: 20, color: "red", fontWeight: 600 }}>
            {import.meta.env.VITE_MSGENVIRONMENT && " (" + import.meta.env.VITE_MSGENVIRONMENT + ")"}
          </Typography>
        </Typography>

        <Box width="100%">
          <Accordion
            disableGutters
            expanded={accordion === "closed"}
            sx={{ width: "100%" }}
            onChange={(_, expanded) => handleChangeAccordion(expanded, "closed")}
          >
            <AccordionSummary expandIcon={<Icon className="fa-caret-down" />}>
              <Typography fontWeight={600}>
                {lang?.solicitudescerradas_label || ""} ({pagination.closed.total || 0})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loading ? (
                <Stack direction={{ xs: "column", md: "row" }} flexWrap="wrap" spacing={1}>
                  {Array.from(Array(10).keys()).map((index) => (
                    <Skeleton
                      key={index}
                      variant="rounded"
                      height={120}
                      sx={{
                        borderRadius: 0.5,
                        width: { xs: "100%", md: Flex.getWrapWidth(2, 8), lg: Flex.getWrapWidth(5, 8) },
                      }}
                    />
                  ))}
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <Stack direction={{ xs: "column", md: "row" }} flexWrap="wrap" spacing={1}>
                    {contracts.closed.map((contract, index) => {
                      return (
                        <CardContract
                          key={index}
                          id={contract.soli}
                          title={contract.cname}
                          status={CONTRACT_STATUS.closed}
                        />
                      )
                    })}
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end">
                    <Pagination
                      color="primary"
                      page={pagination.closed.page}
                      count={Math.ceil(pagination.closed.total / pagination.closed.limit)}
                      onChange={(_, value) => handleChangePagination("closed", value)}
                    />
                  </Stack>
                </Stack>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box width="100%">
          <Accordion
            disableGutters
            expanded={accordion === "open"}
            sx={{ width: "100%" }}
            onChange={(_, expanded) => handleChangeAccordion(expanded, "open")}
          >
            <AccordionSummary expandIcon={<Icon className="fa-caret-down" />}>
              <Typography fontWeight={600}>
                {lang?.enproces_label || ""} ({pagination.open.total || 0})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loading ? (
                <Stack direction={{ xs: "column", md: "row" }} flexWrap="wrap" spacing={1}>
                  {Array.from(Array(10).keys()).map((index) => (
                    <Skeleton
                      key={index}
                      variant="rounded"
                      height={120}
                      sx={{
                        borderRadius: 0.5,
                        width: { xs: "100%", md: Flex.getWrapWidth(2, 8), lg: Flex.getWrapWidth(4, 8) },
                      }}
                    />
                  ))}
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <Stack direction={{ xs: "column", md: "row" }} flexWrap="wrap" spacing={1}>
                    {contracts.open.map((contract, index) => (
                      <CardContract
                        key={index}
                        id={contract.soli}
                        title={contract.cname}
                        status={CONTRACT_STATUS.open}
                      />
                    ))}
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end">
                    <Pagination
                      color="primary"
                      page={pagination.open.page}
                      count={Math.ceil(pagination.open.total / pagination.open.limit)}
                      onChange={(_, value) => handleChangePagination("open", value)}
                    />
                  </Stack>
                </Stack>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Stack>
    </Wrapper>
  );
}

export default Dashboard;
