using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace GMS
{
    public partial class common : System.Web.UI.Page
    {

        #region "variables declarations"

        //static string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];

        #endregion

        [System.Web.Services.WebMethod]
        public static string ViewBranchManagerList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_user", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewSelectUser()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_user_activity", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                //objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string ViewAvailableGroupList(string crsId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_group", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@cmo_crs_id", SqlDbType.BigInt).Value = Convert.ToInt64(crsId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }

            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string ViewSelectBatchListGroupWise(string strYrId, string strBrId, string strCrsId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_group_batch", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@cl_yr_id", SqlDbType.BigInt).Value = Convert.ToInt64(strYrId);
                objCmd.Parameters.Add("@cl_br_id", SqlDbType.BigInt).Value = Convert.ToInt64(strBrId);
                objCmd.Parameters.Add("@cl_crs_id", SqlDbType.BigInt).Value = Convert.ToInt64(strCrsId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

       
        [System.Web.Services.WebMethod]
        public static string ViewCourseGroupList(string crsId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_course_group", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@cmo_crs_id", SqlDbType.BigInt).Value = Convert.ToInt64(crsId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                return "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewAvailableSubjectList(string moId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_subject", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@smo_mo_id", SqlDbType.BigInt).Value = Convert.ToInt64(moId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }
            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewProfessorCourswiseSubjectList(string strCrsId, string strProfId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_professor_course_subject", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@crs_id", SqlDbType.BigInt).Value = Convert.ToInt64(strCrsId);
                objCmd.Parameters.Add("@prof_id", SqlDbType.BigInt).Value = Convert.ToInt64(strProfId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }
            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewGroupSubjectList(string moId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_group_subject", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@smo_mo_id", SqlDbType.BigInt).Value = Convert.ToInt64(moId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewMultipleGroupSubjectList(string moId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_multi_group_subject", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@mo_ids", SqlDbType.VarChar,800).Value = moId;

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string ViewSubjectList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_all_subject", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewYearList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_year", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewMenuModulesList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_menu_modules", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

               // objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewBranchList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_branch_1", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }
            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewBranchClassList(string strBrId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_branch_batch", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@br_id", SqlDbType.BigInt).Value = Convert.ToInt64(strBrId);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }
            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewEducationBoardList()
        {
            string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
            string strXml = "";
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_select_education_board", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;
            //objCmd.Parameters.Add("@brState", SqlDbType.VarChar, 20).Value = brState;
            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;

        }

        [System.Web.Services.WebMethod]
        public static string ViewCourseList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_course", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewSchoolList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_school", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewEnquirySourceList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_enquiry_source", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }


            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewEnquiryTypeList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_enquiry_type", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewEnquiryLostReasonList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_enquiry_lost_reason", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewEnquiryLostReasonCommentsList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_enquiry_lost_reason_comments", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);


                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }
            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewEnquiryFollowupCommentsList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_enquiry_followup_comments", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewAreaList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_area", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml= "-1";
            }

            return strXml;
        }
        [System.Web.Services.WebMethod]
        public static string ViewGroupMultipleCourse(string crsIds)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_group_multiple_courses", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);

                if (crsIds == "")
                {
                    objCmd.Parameters.Add("@cmo_crs_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@cmo_crs_id", SqlDbType.BigInt).Value = crsIds;
                }

                
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                return "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewBatchMultipleYearBranchCourse(string yrIds, string brIds, string crsIds)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_batch_multiple_year_branch_courses", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);

                if (yrIds == "")
                {
                    objCmd.Parameters.Add("@yr_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@yr_id", SqlDbType.BigInt).Value = yrIds;
                }

                if (brIds == "")
                {
                    objCmd.Parameters.Add("@br_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@br_id", SqlDbType.BigInt).Value = brIds;
                }

                if (crsIds == "")
                {
                    objCmd.Parameters.Add("@crs_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@crs_id", SqlDbType.BigInt).Value = crsIds;
                }

                
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                return "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewCounselerList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_counselers_1", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                return "-1";
            }

            return strXml;
        }
        [System.Web.Services.WebMethod]
        public static string ViewModulesList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_modules", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewClassList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_batch", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewAvailableStudenAssignBatch(string yrId, string brId, string crsId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_view_students_Assign_batch", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);

                if (yrId == "")
                {
                    objCmd.Parameters.Add("@yr_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@yr_id", SqlDbType.BigInt).Value = yrId;
                }

                if (brId == "")
                {
                    objCmd.Parameters.Add("@br_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@br_id", SqlDbType.BigInt).Value = brId;
                }

                if (crsId == "")
                {
                    objCmd.Parameters.Add("@crs_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@crs_id", SqlDbType.BigInt).Value = crsId;
                }
                
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }
            return strXml;
        }

       

        [System.Web.Services.WebMethod]
        public static string ViewYearBranchCourseBatchList(string yrId, string brId, string crsId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_year_branch_course_batch", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);

                if (yrId == "")
                {
                    objCmd.Parameters.Add("@yr_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@yr_id", SqlDbType.BigInt).Value = yrId;
                }

                if (brId == "")
                {
                    objCmd.Parameters.Add("@br_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@br_id", SqlDbType.BigInt).Value = brId;
                }

                if (crsId == "")
                {
                    objCmd.Parameters.Add("@crs_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@crs_id", SqlDbType.BigInt).Value = crsId;
                }

               

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string ViewExamList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_exam", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string CheckPaymentOption(string strYear, string strBranch, string strCourse, string strGroup)
        {
            int intReturn = 0;
            Decimal flAmount = 0;
            string strReturn = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_payment_option_selects", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);

                if (strYear == "")
                {
                    objCmd.Parameters.Add("@yr_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@yr_id", SqlDbType.BigInt).Value = strYear;
                }

                if (strBranch == "")
                {
                    objCmd.Parameters.Add("@br_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@br_id", SqlDbType.BigInt).Value = strBranch;
                }

                if (strCourse == "")
                {
                    objCmd.Parameters.Add("@crs_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@crs_id", SqlDbType.BigInt).Value = strCourse;
                }
                if (strGroup == "")
                {
                    objCmd.Parameters.Add("@mo_id", SqlDbType.BigInt).Value = System.DBNull.Value;
                }
                else
                {
                    objCmd.Parameters.Add("@mo_id", SqlDbType.BigInt).Value = strGroup;
                }



                objCmd.Parameters.Add("@amount", SqlDbType.Float).Direction = ParameterDirection.Output;
                objCmd.Parameters.Add("@intRet", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }
                objCmd.ExecuteNonQuery();

                intReturn = Convert.ToInt16(objCmd.Parameters["@intRet"].Value);

                if (intReturn == 1)
                {
                    flAmount = Convert.ToDecimal(objCmd.Parameters["@amount"].Value);
                }

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                intReturn = -1;
            }

            strReturn = intReturn.ToString() + "," + flAmount.ToString();
            return strReturn.ToString();
        }

        [System.Web.Services.WebMethod]
        public static string ViewTestTypeList(string strYear)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_Test_Type_1", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@yr_id", SqlDbType.BigInt).Value = Convert.ToInt64(strYear);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewSubjectChapterList(string subId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_subject_chapter", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@top_sub_id", SqlDbType.BigInt).Value = Convert.ToInt64(subId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewTestList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_test", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewTutorialList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_tutorial", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewTestTypeLists()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_test_type", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewVenueList(string strBrId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_venue", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@br_id", SqlDbType.BigInt).Value = Convert.ToInt64(strBrId);
                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }
            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewProfessorList()
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_professor", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewAvailableCourseSubjectList(string crsId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_course_subject", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@crs_id", SqlDbType.BigInt).Value = Convert.ToInt64(crsId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewCourseProfessorList(string strCrsId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_course_professor", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@crs_id", SqlDbType.BigInt).Value = Convert.ToInt64(strCrsId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewProfessorSubjectList(string strProfessorId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_professor_subject", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
                objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@iu_id", SqlDbType.BigInt).Value = Convert.ToInt64(strProfessorId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string ViewSubjectTopicList(string strSubId, string strYrId)
        {
            string strXml = "";
            try
            {
                string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_select_subject_topics", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                //objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);
               // objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
                objCmd.Parameters.Add("@sub_id", SqlDbType.BigInt).Value = Convert.ToInt64(strSubId);
                objCmd.Parameters.Add("@yr_id", SqlDbType.BigInt).Value = Convert.ToInt64(strYrId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                strXml = "-1";
            }

            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string AssignMenuPermissions()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings[Convert.ToString(HttpContext.Current.Session["strCon"])];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_assign_menu_activity_user", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;

            objCmd.Parameters.Add("@ins_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_ins_id"]);
            objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["iu_id"]);


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }

/// <summary>
/// FOR XOO 
/// </summary>
/// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string fnSchoolsSelect()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_schools_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;
          

            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnCitySelect()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_city_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnCareerSelect()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_careers_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnMachineTypeSelect()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_machine_type_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnMachineSubTypeSelect(string strMachineTypeId)
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_machine_sub_type_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;

            objCmd.Parameters.Add("@mast_maty_id", SqlDbType.BigInt).Value = Convert.ToInt64(strMachineTypeId);

            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnModelSelectNew()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_model_select_new", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnModelSelect(string strBrandId)
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_model_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;

            objCmd.Parameters.Add("@mode_bran_id", SqlDbType.BigInt).Value = Convert.ToInt64(strBrandId);

            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnModelSelectByMachineSubType(string strMachineSubTypeId)
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_model_select_machine_sub_type", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;

            objCmd.Parameters.Add("@mast_id", SqlDbType.BigInt).Value = Convert.ToInt64(strMachineSubTypeId);

            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


       


        [System.Web.Services.WebMethod]
        public static string fnGetComponentBrand()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_component_brand_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnGetCapacity()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_capacity_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnGetUnit()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_unit_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnGetBrand()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_brand_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string fnGetWorkerIssueSelect()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_worker_issue_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnGetComponentSelect()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_component_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnGetComponentSelectByModel(string strModelId)
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_component_select_by_model", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;

            objCmd.Parameters.Add("@mode_id", SqlDbType.BigInt).Value = Convert.ToInt64(strModelId);

            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnBrandSelect()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_brand_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnGetLaymanIssueSelect()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_layman_issue_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnGetTechnitianSelect()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_technitian_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string fnGetServiceSelect()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_service_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }


        [System.Web.Services.WebMethod]
        public static string fnHomeUserSelect()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_select_user", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string fnGetDesignation()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_designation_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string fnGetArea()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_area_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }

        [System.Web.Services.WebMethod]
        public static string fnGetUserSpecification()
        {
            string strXml = "";
            string strConn = ConfigurationSettings.AppSettings["strCon"];
            SqlConnection objCon = new SqlConnection(strConn);
            SqlCommand objCmd = new SqlCommand("wb_specification_select", objCon);
            objCmd.CommandType = CommandType.StoredProcedure;


            if (objCon.State == ConnectionState.Closed)
            {
                objCon.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            da.SelectCommand = objCmd;
            da.Fill(ds);

            strXml = ds.GetXml();
            strXml = strXml.Replace("NewDataSet", "data");
            strXml = strXml.Replace("Table", "row");

            objCmd.Dispose();
            objCon.Close();
            objCon.Dispose();
            return strXml;
        }

    }
}