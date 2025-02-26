"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Button,
  styled,
  Chip,
  Avatar,
  Divider,
} from "@mui/material"
import { Edit, MoreVert, Add, LocationOn, Phone, Email, Business, CheckCircle, Cancel } from "@mui/icons-material"
import { usePractice } from "../store/PracticeContext"
import { motion } from "framer-motion"

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
  },
}))

const CardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const CardFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: "auto",
}))

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  "& svg": {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    fontSize: "1rem",
  },
}))

const StatusChip = styled(Chip)<{ status: "active" | "inactive" }>(({ theme, status }) => ({
  borderRadius: 16,
  height: 24,
  fontSize: "0.75rem",
  fontWeight: 600,
  ...(status === "active" && {
    backgroundColor: "#E4F7F9",
    color: "#67ADB9",
  }),
  ...(status === "inactive" && {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[600],
  }),
}))

const SpecialtyChip = styled(Chip)(({ theme }) => ({
  borderRadius: 16,
  height: 24,
  fontSize: "0.75rem",
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.dark,
  margin: theme.spacing(0.5),
}))

interface Practice {
  id: string
  name: string
  address: string
  phone: string
  email: string
  status: "active" | "inactive"
  specialties: string[]
  patientsCount: number
  doctorsCount: number
}

const practices: Practice[] = [
  {
    id: "1",
    name: "Cape Fertility Clinic",
    address: "123 Main Street, Cape Town",
    phone: "+27 794 3956",
    email: "info@capefertility.co.za",
    status: "active",
    specialties: ["Fertility", "IVF", "Gynecology"],
    patientsCount: 245,
    doctorsCount: 12,
  },
  {
    id: "2",
    name: "Sunshine Medical Center",
    address: "45 Beach Road, Durban",
    phone: "+27 612 8734",
    email: "contact@sunshinemedical.co.za",
    status: "active",
    specialties: ["Pediatrics", "Family Medicine", "Cardiology"],
    patientsCount: 378,
    doctorsCount: 18,
  },
  {
    id: "3",
    name: "Oceanview Healthcare",
    address: "78 Coastal Drive, Port Elizabeth",
    phone: "+27 845 2190",
    email: "info@oceanviewhealth.co.za",
    status: "inactive",
    specialties: ["Orthopedics", "Physical Therapy", "Sports Medicine"],
    patientsCount: 156,
    doctorsCount: 8,
  },
  {
    id: "4",
    name: "Mountain View Hospital",
    address: "92 Highland Road, Johannesburg",
    phone: "+27 723 4567",
    email: "admin@mountainview.co.za",
    status: "active",
    specialties: ["Surgery", "Internal Medicine", "Neurology"],
    patientsCount: 412,
    doctorsCount: 25,
  },
  {
    id: "5",
    name: "City Central Medical",
    address: "15 Urban Street, Pretoria",
    phone: "+27 634 9821",
    email: "info@citycentral.co.za",
    status: "active",
    specialties: ["Dermatology", "Allergy", "Immunology"],
    patientsCount: 289,
    doctorsCount: 14,
  },
  {
    id: "6",
    name: "Riverside Health Clinic",
    address: "33 River Road, Bloemfontein",
    phone: "+27 567 3421",
    email: "contact@riverside.co.za",
    status: "inactive",
    specialties: ["Psychiatry", "Psychology", "Mental Health"],
    patientsCount: 175,
    doctorsCount: 9,
  },
]

export const ManagePractices: React.FC = () => {
  const navigate = useNavigate()
  const { setSelectedPractice } = usePractice()

  const handlePracticeClick = (practice: Practice) => {
    setSelectedPractice({
      id: practice.id,
      name: practice.name,
      address: practice.address,
      phone: practice.phone,
      email: practice.email,
    })
    navigate("/users") // Navigate to users page after selecting practice
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          Manage Practices
        </Typography>
        <Button
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: "primary.main",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          Add Practice
        </Button>
      </Box>

      <Grid container spacing={3}>
        {practices.map((practice, index) => (
          <Grid item xs={12} sm={6} md={4} key={practice.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <StyledCard onClick={() => handlePracticeClick(practice)}>
                <CardHeader>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 40,
                        height: 40,
                        mr: 1.5,
                      }}
                    >
                      {practice.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                        {practice.name}
                      </Typography>
                      <StatusChip
                        size="small"
                        icon={
                          practice.status === "active" ? <CheckCircle fontSize="small" /> : <Cancel fontSize="small" />
                        }
                        label={practice.status === "active" ? "Active" : "Inactive"}
                        status={practice.status}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                </CardHeader>

                <CardContent sx={{ flexGrow: 1 }}>
                  <InfoItem>
                    <LocationOn fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {practice.address}
                    </Typography>
                  </InfoItem>
                  <InfoItem>
                    <Phone fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {practice.phone}
                    </Typography>
                  </InfoItem>
                  <InfoItem>
                    <Email fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {practice.email}
                    </Typography>
                  </InfoItem>

                  <Divider sx={{ my: 1.5 }} />

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Specialties
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", mb: 1 }}>
                    {practice.specialties.map((specialty, i) => (
                      <SpecialtyChip key={i} label={specialty} size="small" />
                    ))}
                  </Box>
                </CardContent>

                <CardFooter>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Business fontSize="small" sx={{ mr: 0.5, color: "primary.main" }} />
                      <Typography variant="body2" color="text.secondary">
                        {practice.doctorsCount} Doctors
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body2" color="text.secondary">
                        {practice.patientsCount} Patients
                      </Typography>
                    </Box>
                  </Box>
                </CardFooter>
              </StyledCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

